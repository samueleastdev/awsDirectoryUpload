const { S3Client, PutObjectCommand, GetBucketLocationCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
const walk = require("walk");
const mime = require('node-mime-types');
const { getMIMEType, getExtension } = require('node-mime-types');
const EventEmitter = require('events');

/**
 * Uploads a directory and subfolders to AWS S3 bucket with progress indicator
 */
class awsDirectoryUpload extends EventEmitter {

    constructor({
        chunkSize = 200,
        retryTimeout = 1000,
        retryAttempts = 3,
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

        // Start uploader
        this.listAllFiles();

    }

    listAllFiles() {

        let walker = walk.walk(this.localFolderPath, { followLinks: false });

        walker.on("file", (root, stat, next) => {

            let filePath = root + "/" + stat.name;

            let awsUploadParams = {
                Bucket: this.s3UploadBucket,
                Key: this.s3UploadFolder + filePath.replace(this.localFolderPath, ""),
                Body: fs.readFileSync(filePath),
                Path: filePath
            };

            if (getMIMEType(stat.name)) {
                awsUploadParams.ContentType = getMIMEType(stat.name);
            }

            this.uploaderParams.push(new PutObjectCommand(awsUploadParams));

            next();
        });

        walker.on("end", () => {

            const chunks = this.createArrayChunks(this.uploaderParams);

            (async () => {
                try {

                    await this.uploadChunks(chunks);

                    this.emit("finished", {
                        message: 'Successfully Uploaded',
                    });

                } catch (err) {

                    this.emit("error", new Error(err));

                }
            })();

        });

    }

    uploadChunks(chunkedFiles) {

        const self = this;

        return new Promise((resolve, reject) => {

            // Setup s3 connection with creds if set
            let config = {
                region: "us-east-1"
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

                            progress++;

                            let chunkProgress = Math.round((progress / files.length) * 100);

                            self.emit("progress", {
                                progress: chunkProgress,
                                totalProgress: (chunkedIndex / chunkedLength) * 100,
                                chunkedIndex: chunkedIndex,
                                chunkedLength: chunkedLength,
                            });

                            return result;
                        };

                        await Promise.all(files.map((chunk) => onProgress(s3.send(chunk)))).then(function (uploadFiles) {

                            (async () => {
                                try {

                                    // Remove uploaded files if set
                                    if (self.removeUploadedFiles) await cleanUploadedFiles(files);

                                    if (chunkedIndex + 1 === chunkedFiles.length) {

                                        self.emit("progress", {
                                            progress: 100,
                                            chunkedProgress: 100,
                                            chunkedIndex: chunkedLength,
                                            chunkedLength: chunkedLength,
                                        });

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

    cleanUploadedFiles(files) {

        return new Promise((resolve, reject) => {

            var i = files.length;

            files.forEach(function (filepath) {
                fs.unlink(filepath.input.Path, function (err) {
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

}

module.exports = awsDirectoryUpload;