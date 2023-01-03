import mysql from 'mysql2';
import { config } from '../config.js';

// sql에 접속
const pool = mysql.createPool({
  host: config.db.host, // 127.0.0.1 localhost로하면 왜 안될까?
  user: config.db.user, // root
  database: config.db.databse, // dwitter
  password: config.db.password, // 1q2w3e4r
  port: config.db.port, // 3306
});

// 비동기적으로 사용할 것이기에
// pool의 promise 버전을 export한다
// 이제 이 db로 data(model) 폴더에서 mysql에 접속하고 읽고쓰기를 한다
export const db = pool.promise();
