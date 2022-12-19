
//import {S3Client, PutObjectCommand }from '@aws-sdk/client-s3';
import AWS from 'aws-sdk';
import path from 'path';
import fs  from 'fs';

const uploadImages = async (file) => {

AWS.config.update({region: 'us-east-1'});
const s3 = new AWS.S3({apiVersion: '2022-12-19'});
const uploadParams: any = {
    Bucket: 'tbk8',
    Key: '',
    Body: ''
    };
const fileStream = fs.createReadStream(file);
    fileStream.on('error', function(err) {
      console.log('File Error', err);
    });

    uploadParams.Body = fileStream;
    uploadParams.Key = path.basename(file);
    s3.upload (uploadParams, function (err, data) {
        if (err) {
          console.log("Error >>>>>>>>>>>>>>", err);
          return err;
        } if (data) {
          console.log("Upload Success", data.Location);
          return data;
        }
      });
}

export default uploadImages;