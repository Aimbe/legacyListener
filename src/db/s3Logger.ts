import winston from 'winston';
import moment from 'moment';
// const s3StreamLogger = require('s3-streamlogger').S3StreamLogger;
// import { S3StreamLogger } from 's3-streamlogger';
import { S3StreamLogger } from '@austonpramodh/s3-streamlogger-ts';
import 'dotenv/config';

// const s3Stream = new s3StreamLogger({
const s3Stream = new S3StreamLogger({
  bucket: <string>process.env.S3_BUCKET_NAME,
  folder: <string>process.env.S3_FOLDER_NAME,
  accessKeyId: <string>process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: <string>process.env.S3_SECRET_ACCESS_KEY,
  //rotate_every: Number(String(process.env.S3_ROTATE_EVERY)),
});

const transportS3 = new winston.transports.Stream({
  stream: s3Stream,
});

const logger = winston.createLogger({
  transports: [transportS3],
});

async function s3Write(logData: string) {
  //   let dt = new Date();
  //   let writeTime = dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+ ' '+dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds() ;
  const writeTime = moment().format();
  await logger.info(writeTime + ' ' + logData);
}

export default { s3Write };

// module.exports = {
//     s3Write:
//       function (logData: string) {
//     //   let dt = new Date();
//     //   let writeTime = dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+ ' '+dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds() ;
//     let writeTime =  moment().format();
//     logger.info(writeTime + " " + logData);
// }}

// module.exports = { s3Write: function (logData: string) {
//     let dt = new Date();
//     let writeTime = dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+ ' '+dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds() ;
//     logger.info(writeTime + " " + logData);
// }}

// function myFunction() {
//     let this_time = new Date();
//     console.log(this_time);
//     logger.info("Hello This is Sample 1 Time is " + this_time);
// }

//let myTimeout = setInterval(myFunction, 10000)
// s3Stream.write("Hello This is Sample Time is " + this_time.toString);
