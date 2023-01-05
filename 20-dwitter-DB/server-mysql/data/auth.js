// bob 비번 : abcd1234
// ellie 비번 : abcd1234

// Mysql--------------------------------------------------------------
import { db } from '../db/database.js';

export async function findByUsername(username) {
  return db
    .execute('SELECT * FROM users WHERE username=?', [username]) //
    .then((result) => result[0][0]);
}

export async function findById(id) {
  return db
    .execute('SELECT * FROM users WHERE id=?', [id]) //
    .then((result) => result[0][0]);
}

export async function createUser(user) {
  const { username, password, name, email, url } = user;
  return db
    .execute(
      'INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)',
      [username, password, name, email, url]
    )
    .then((result) => result[0].insertId); // db에서 자동으로 만들어준 user id를 리턴
}
