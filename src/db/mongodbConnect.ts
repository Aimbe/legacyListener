import * as mongoDB from 'mongodb';
// import mongoose from 'mongoose';
import moment from 'moment';
import assert from 'assert';
import 'dotenv/config';

const uri = process.env.MONGODB_CONNECTION || '';
const client = new mongoDB.MongoClient(`${uri}`);

let db: mongoDB.Db;

client.connect(function (err) {
  assert.equal(null, err);
  console.log('MongoDB Connected successfully to server');

  db = client.db('csms_log');
});

async function insertMongodb(collectionType: string, errorPlace: string, documentMessage: string) {
  const writeTime = moment().format('YYYY-MM-DD HH:mm:ss');
  const server_name: string = <string>process.env.THIS_SERVER_NAME;

  db.collection(collectionType).insertOne({ ServerName: server_name, Time: writeTime, Error_place: errorPlace, Message: documentMessage });
}

export default { insertMongodb };
