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
  //accessKeyId: '',
  //secretAccessKey: ''
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
