# AWS Directory Upload

```
const awsDirectoryUpload = require('aws-directory-upload');

let uploader = new awsDirectoryUpload({
    localFolderPath: '/Users/samueleast/Desktop/ops',
    s3UploadBucket: 'wptuts-deliver',
    s3UploadFolder: 'checkingIn',
    //accessKeyId: '',
    //secretAccessKey: ''
});

// register event listener
uploader.on("progress", function (data) {
    console.log(data);
});

uploader.on("finished", function (data) {
    console.log('finished', data);
});

uploader.on("error", function (err) {
    console.log(err);
});
```
