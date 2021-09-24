# AWS Directory Upload

```
npm install aws-directory-upload
```

```js
const awsDirectoryUpload = require("aws-directory-upload");

let uploader = new awsDirectoryUpload({
  localFolderPath: "/Users/dave/Desktop/folder", // Required - The path to the folder you want to upload
  s3UploadBucket: "bucket", // Required - The name of the S3 bucket you want to upload to
  s3UploadFolder: "folder", // Required - The folder you would like to create in your bucket for the upload
  //chunkSize: 10, // Optional - the amount of files to upload at one time
  //removeUploadedFiles: true, // Optional - if set to true this will remove the files after they have been uploaded
  //filterExtensions: ['mp3'],  // Optional - only upload certain file types
  //accessKeyId: '', // Optional - Your AWS IAM access id
  //secretAccessKey: '' // Optional - Your AWS IAM secret access key
});

uploader.on("progress", function (data) {
  console.log(data);
});

uploader.on("finished", function (data) {
  console.log("finished", data);
});

uploader.on("details", function (data) {
  console.log("details", data);
});

uploader.on("files", function (files) {
  console.log(files);
});

uploader.on("error", function (err) {
  console.log(err);
});
```

# API

## Available Params

| Params              | Description                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| localFolderPath     | The path to the folder on your computer you want to upload                  |
| s3UploadBucket      | The AWS S3 bucket name you want to upload to                                |
| s3UploadFolder      | The AWS S3 folder name you want to upload to                                |
| chunkSize           | The size to split the files into manageable chunks to upload                |
| removeUploadedFiles | If set when a batch of files have been uploaded they will be delete locally |
| filterExtensions    | Only upload files with specific extensions accepts array ['mp3','mp4']      |
| accessKeyId         | Your AWS IAM access id                                                      |
| secretAccessKey     | Your AWS IAM secret access key                                              |

## Available Events

| Events   | Description                                                |
| -------- | ---------------------------------------------------------- |
| progress | Lists progress, totalProgress, chunkedIndex, chunkedLength |
| finished | When all files have been uploaded                          |
| files    | Returns the batch of uploaded files                        |
| error    | Lists any errors                                           |
