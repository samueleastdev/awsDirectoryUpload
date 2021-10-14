const { S3Client, PutObjectCommand, GetBucketLocationCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
//const walk = require("walk");
const walk = require("@root/walk");
const mime = require('node-mime-types');
const { getMIMEType, getExtension } = require('node-mime-types');
const EventEmitter = require('events');

/**
 * Uploads a directory and subfolders to AWS S3 bucket with progress indicator
 */
class awsDirectoryUpload extends EventEmitter {

    constructor({
        chunkSize = 250,
        retryTimeout = 10000,
        retryAttempts = 2,
        retryCount = 0,
        filterExtensions = undefined,
        filesScanned = 0,
        filesFound = 0,
        showStats = false,
        removeUploadedFiles = false,
        localFolderPath = undefined,
        s3UploadBucket = undefined,
        s3UploadFolder = undefined,
        accessKeyId = undefined,
        secretAccessKey = undefined
    }) {
        super();
        this.chunkSize = chunkSize;
        this.retryTimeout = retryTimeout;
        this.retryAttempts = retryAttempts;
        this.retryCount = retryCount;
        this.filterExtensions = filterExtensions;
        this.filesScanned = filesScanned;
        this.filesFound = filesFound;
        this.showStats = showStats;
        this.removeUploadedFiles = removeUploadedFiles;
        this.localFolderPath = localFolderPath;
        this.s3UploadBucket = s3UploadBucket;
        this.s3UploadFolder = s3UploadFolder;
        this.accessKeyId = accessKeyId;
        this.secretAccessKey = secretAccessKey;
        this.uploaderParams = [];

        // Make sure required params are set
        if (!this.localFolderPath) return console.log('The localFolderPath param is a required parameter');
        if (!this.s3UploadBucket) return console.log('The s3UploadBucket param is a required parameter');
        if (!this.s3UploadFolder) return console.log('The s3UploadFolder param is a required parameter');
        if (!fs.existsSync(this.localFolderPath)) return console.log('The localFolderPath folder does not exists');

        // Start uploader
        this.listAllFiles();

    }

    /**
     * Main init function to gether all the files and then start the uploader
     */
    listAllFiles() {

        const self = this;

        walk.walk(this.localFolderPath, walkFunc).then(function() {

            self.emit("details", {
                message: 'Files gathered...',
            });

            // Filter the files by extension if set
            if (self.filterExtensions) {

                self.uploaderParams = self.uploaderParams.filter(file => self.filterExtensions.includes(file.input.Path.split('.').pop()));

                self.emit("details", {
                    message: 'Files filtered...',
                });

            }

            self.emit("preparing", {
                filesScanned: self.filesScanned,
                filesFound: self.filesFound,
                filesToUpload: self.uploaderParams.length
            });

            if (self.uploaderParams.length <= 0) {

                self.emit("details", {
                    message: 'No files found...',
                });
                self.emit("error", "No files found...");
                return;
            }

            const chunks = self.createArrayChunks(self.uploaderParams);

            //console.log(self.uploaderParams.map((file) => file.input));

            async function startUploader() {

                self.emit("details", {
                    message: 'Starting uploader...',
                });

                //await new Promise(resolve => setTimeout(resolve, 30000));

                await self.uploadChunks(chunks);

                self.emit("finished", {
                    message: 'Successfully Uploaded',
                });

            }

            // Start the uploader process
            function begin() {

                // Run the async function
                startUploader().catch(err => {

                    self.emit("details", {
                        message: `Uploader bailed retrying in ${self.retryTimeout}... ${err}`,
                    });

                    setTimeout(() => {

                        self.emit("details", {
                            message: `Running again retryCount:${self.retryCount}... retryAttempts:${self.retryAttempts}`,
                        });

                        if (self.retryCount < self.retryAttempts) {

                            self.retryCount++;

                            begin();

                        } else {

                            self.emit("error", new Error(err));

                            return new Error(err);

                        }

                    }, self.retryTimeout)

                });

            }

            begin();

        });

        // walkFunc must be async, or return a Promise
        function walkFunc(err, pathname, dirent) {
            if (err) {
                // throw an error to stop walking
                // (or return to ignore and keep going)
                console.warn("fs stat error for %s: %s", pathname, err.message);
                return Promise.resolve();
            }

            // return false to skip a directory
            // (ex: skipping "dot file" directories)
            if (dirent.isDirectory() && dirent.name.startsWith(".")) {
                return Promise.resolve(false);
            }

            if (dirent.isFile()) {

                let awsUploadParams = {
                    Bucket: self.s3UploadBucket,
                    Key: self.convertBackslashes(self.s3UploadFolder + pathname.replace(self.localFolderPath, "")),
                    Body: fs.readFileSync(pathname),
                    Path: pathname
                };

                if (getMIMEType(dirent.name)) {
                    awsUploadParams.ContentType = getMIMEType(dirent.name);
                }

                self.uploaderParams.push(new PutObjectCommand(awsUploadParams));

                self.filesFound++;

                //console.log("name:", pathname);

            }

            self.filesScanned++;

            return Promise.resolve();

        }

    }

    /**
     * 
     * Uploads a chunked array of files to AWS
     * 
     * @param {*} chunkedFiles 
     * @returns 
     */
    uploadChunks(chunkedFiles) {

        this.emit("details", {
            message: 'Uploader starting...',
        });

        const self = this;

        return new Promise((resolve, reject) => {

            // Setup s3 connection with creds if set
            let config = {
                region: "us-east-1",
                maxAttempts: 0
            }
            if (self.accessKeyId && self.secretAccessKey) {
                config.credentials = {
                    accessKeyId: this.accessKeyId,
                    secretAccessKey: this.secretAccessKey
                }
            }

            let s3 = new S3Client(config);

            (async () => {

                try {
                    const command = new GetBucketLocationCommand({
                        Bucket: self.s3UploadBucket
                    });

                    const bucket = await s3.send(command);

                    if (bucket.LocationConstraint) {
                        config.region = bucket.LocationConstraint;
                        s3 = new S3Client(config);
                    }

                } catch (err) {

                    return reject(new Error(err));

                }
            })();

            // Start chunks upload
            let progress = 0;

            let chunkedIndex = 0;

            const chunkedLength = chunkedFiles.length;

            function uploadChunk(files) {

                progress = 0;

                // Start function
                (async () => {
                    try {

                        const onProgress = async (promise) => {
                            const result = await promise;

                            let chunkProgress = Math.round((progress / files.length) * 100);

                            let info = {
                                progress: chunkProgress,
                                totalProgress: (chunkedIndex / chunkedLength) * 100,
                                chunkedIndex: chunkedIndex,
                                chunkedLength: chunkedLength,
                                file: files[progress].input.Path
                            };

                            if (self.showStats) {
                                info.stats = fs.statSync(files[progress].input.Path);
                            }

                            self.emit("progress", info);

                            progress++;

                            return result;
                        };

                        await Promise.all(files.map((chunk) => onProgress(s3.send(chunk)))).then(function(uploadFiles) {

                            (async () => {
                                try {

                                    // Remove uploaded files if set
                                    if (self.removeUploadedFiles) await self.cleanUploadedFiles(files);

                                    if (chunkedIndex + 1 === chunkedFiles.length) {

                                        self.emit("progress", {
                                            progress: 100,
                                            chunkedProgress: 100,
                                            chunkedIndex: chunkedLength,
                                            chunkedLength: chunkedLength
                                        });

                                        self.emit("files", files.map((file) => file.input));

                                        resolve('true');

                                    } else {

                                        chunkedIndex++;
                                        uploadChunk(chunkedFiles[chunkedIndex]);

                                    }

                                } catch (err) {

                                    return reject(new Error(err));

                                }
                            })();

                        }).catch((err) => {

                            return reject(new Error(err));

                        });

                    } catch (err) {

                        return reject(new Error(err));

                    }
                })();

            }

            uploadChunk(chunkedFiles[chunkedIndex]);

        });

    }

    /**
     * 
     * Splits large arra into manageable chunks
     * 
     * @param {*} params 
     * @returns 
     */
    createArrayChunks(params) {

        // Break array into chunks of perChunk 100 set above
        return params.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / this.chunkSize);

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = []; // start a new chunk
            }

            resultArray[chunkIndex].push(item);

            return resultArray;
        }, []);

    }

    /**
     * 
     * If set in option this will remove any uploaded files
     * 
     * @param {*} files 
     * @returns 
     */
    cleanUploadedFiles(files) {

        return new Promise((resolve, reject) => {

            var i = files.length;

            files.forEach(function(filepath) {
                fs.unlink(filepath.input.Path, function(err) {
                    i--;

                    if (err) {
                        return reject(new Error(err));
                    } else if (i <= 0) {
                        resolve('File cleaned');
                    }
                });
            });

        });
    }

    /**
     * 
     * This is needed for window as a fix for back slashes
     * @param {*} path 
     * @returns 
     */
    convertBackslashes(path) {
        return path.replace(/\\/g, "/");
    }
}

module.exports = awsDirectoryUpload;