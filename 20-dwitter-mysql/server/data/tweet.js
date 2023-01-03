import { db } from '../db/database.js';

const SELECT_JOIN =
  'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id';
const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

export async function getAll() {
  return db
    .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
    .then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) //
    .then((result) => result[0]);
}

export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
    .then((result) => result[0][0]);
}

export async function create(text, userId) {
  return db
    .execute('INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)', [
      text,
      new Date(),
      userId,
    ])
    .then((result) => getById(result[0].insertId));
}

export async function update(id, text) {
  return db
    .execute('UPDATE tweets SET text=? WHERE id=?', [text, id])
    .then(() => getById(id));
}

export async function remove(id) {
  return db.execute('DELETE FROM tweets WHERE id=?', [id]);
}

// // Memory--------------------------------------------------------------
// import * as userRepository from './auth.js';

// let tweets = [
//   {
//     id: '1', // 트윗 고유 아이디
//     text: '드림코더분들 화이팅!',
//     createdAt: new Date().toString(),
//     userId: '1', // userId는 외래키와 비슷. 1은 bob을 뜻함. 즉 bob이 쓴 글이다.
//   },
//   {
//     id: '2', // 트윗 고유 아이디
//     text: '안뇽!',
//     createdAt: new Date().toString(),
//     userId: '1', // userId는 외래키와 비슷. 1은 bob을 뜻함. 즉 bob이 쓴 글이다.
//   },
// ];

// // getAll은 tweets(promise)를 반환하는 함수
// export async function getAll() {
//   // Promise.all 병렬적으로 한번에 모든 Promise들을 실행!
//   // 즉 각각 3초 4초가 걸리는 promise들이 있다면 동시에 병렬로 실행해서 총 4초가 걸리게끔
//   // 4초 뒤에 다 끝나면 then을 호출한다.
//   // map : 어떤 배열에 있는 모든 요소들의 값을 변경해서 만든 새로운 배열을 써야 할 때가 있습니다.
//   // map에 대한 설명 https://www.freecodecamp.org/korean/news/javascript-map-method/
//   return Promise.all(
//     tweets.map(async (tweet) => {
//       // findById 가 promise를 리턴해서 await를 붙임
//       const { username, name, url } = await userRepository.findById(
//         tweet.userId
//       );
//       return { ...tweet, username, name, url }; // 여기서 반환하는 tweet은 promise
//     }) // 즉 map으로 나온 tweet 배열의 요소들 하나하나가 다 promise이다
//   );
// }

// // username이 같은 트윗들을 배열로 리턴한다
// export async function getAllByUsername(username) {
//   // getAll() 함수가 promise로 반환하니까 then 사용 가능
//   return getAll().then((tweets) =>
//     tweets.filter((tweet) => tweet.username === username)
//   );
// }

// // 해당하는 트위 id를 통해서 그 트윗을 반환한다
// export async function getById(id) {
//   const found = tweets.find((tweet) => tweet.id === id);
//   if (!found) {
//     return null;
//   }
//   const { username, name, url } = await userRepository.findById(found.userId);
//   return { ...found, username, name, url };
// }

// export async function create(text, userId) {
//   const tweet = {
//     id: new Date().toString(),
//     text,
//     createdAt: new Date(),
//     userId,
//   };
//   tweets = [tweet, ...tweets];
//   return getById(tweet.id);
// }

// export async function update(id, text) {
//   const tweet = tweets.find((tweet) => tweet.id === id);
//   if (tweet) {
//     tweet.text = text;
//   }
//   return getById(tweet.id);
// }

// export async function remove(id) {
//   tweets = tweets.filter((tweet) => tweet.id !== id);
// }
