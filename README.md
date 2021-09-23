# AWS Directory Upload

```
npm install aws-directory-upload
```

```js
const awsDirectoryUpload = require("aws-directory-upload");

let uploader = new awsDirectoryUpload({
  localFolderPath: "/Users/dave/Desktop/folder", // Required
  s3UploadBucket: "bucket", // Required
  s3UploadFolder: "folder", // Required
  //chunkSize: 10, // Optional - the amount of files to upload at one time
  //removeUploadedFiles: true, // Optional - if set to true this will remove the files after they have been uploaded
  //accessKeyId: '', // Optional - Your AWS IAM access id
  //secretAccessKey: '' // Optional - Your AWS IAM secret access key
});

uploader.on("progress", function (data) {
  console.log(data);
});

uploader.on("finished", function (data) {
  console.log("finished", data);
});

uploader.on("error", function (err) {
  console.log(err);
});
```
