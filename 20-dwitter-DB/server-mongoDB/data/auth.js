import { getUsers } from '../database/database.js';
import MongoDb from 'mongodb';
const ObjectID = MongoDb.ObjectID;

// SQL: DB Schema
// NOSQL: DB Schema X, ORM Schema
export async function findByUsername(username) {
  return getUsers() //
    .find({ username }) // 멀티검색. 리턴값은 커서. findeOne도 가능
    .next() // next로 하나씩 순차적 검색
    .then(mapOptionalUser);
}

// 몽고디비는 컬렉션에 아이디를 생성할 때 자동으로 _id라는 key값이 잡히고
// value 또한 자동으로 오브젝트로 감싸진다는 점을 유의해야한다.
export async function findById(id) {
  return getUsers()
    .findOne({ _id: new ObjectID(id) }) // 따라서 이렇게 표현식을 써서 검색
    .then(mapOptionalUser); // 전달받은 인자와 호출하는 인자가 같아서 생략. return도 생략된 형태.
  // .then((data)=>return mapOptionalUser(data);) 원래 형태
}

export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((result) => result.ops[0]._id.toString()); // 유저 id 리턴
}

// id를 추가해준다
function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
