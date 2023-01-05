import MongoDb from 'mongodb';
import { config } from '../config.js';

// DB 연결
let db;
export async function connectDB() {
  return MongoDb.MongoClient.connect(config.db.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((client) => {
    db = client.db();
  });
}

export function getUsers() {
  return db.collection('users');
}

export function getTweets() {
  return db.collection('tweets');
}
