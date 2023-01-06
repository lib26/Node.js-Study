import MongoDb from 'mongodb';
import { config } from '../config.js';

// DB 연결
let db;
export async function connectDB() {
  return MongoDb.MongoClient.connect(config.db.host, {
    useNewUrlParser: true, // 옵션들
    useUnifiedTopology: true,
  }).then((client) => {
    db = client.db();
  });
}

// 사용자 collection 전달 함수
export function getUsers() {
  return db.collection('users'); // 컬렉션 이름은 마음대로
}

// 트윗 collection 전달 함수
export function getTweets() {
  return db.collection('tweets');
}
