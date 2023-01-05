import { getTweets } from '../database/database.js';
import * as UserRepository from './auth.js';
import MongoDb from 'mongodb';
const ObjectID = MongoDb.ObjectID;

// NOSQL 에서는 관계를 갖고 join(aggregation)하는 것보다
// 차라리 정보를 중복으로 저정하는 것이 성능에 좋다.

export async function getAll() {
  return getTweets()
    .find() // find는 멀티 문서 검색이다. 리턴 값은 배열이나 객체가 아닌 커서이다.
    .sort({ createdAt: -1 }) // 제일 나중에 만들어진게 제일 위에 있을 수 있도록 정렬
    .toArray() // 결과를 배열 형태로 변환한다.
    .then(mapTweets); // 아이디를 표함 할 수 있게 만든다
}

export async function getAllByUsername(username) {
  return getTweets() //
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets); // 아이디를 표함 할 수 있게 만든다
}

export async function getById(id) {
  console.log(id);
  return getTweets()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalTweet); // 아이디를 표함 할 수 있게 만든다
}

// 나중에 join하지 않기 위해서 생성될 때부터 바로 user의 정보를 중복 저장한다.
export async function create(text, userId) {
  return UserRepository.findById(userId)
    .then((user) =>
      getTweets().insertOne({
        text,
        createdAt: new Date(),
        userId,
        name: user.name,
        username: user.username,
        url: user.url,
      })
    )
    .then((result) => result.ops[0]) // 새로만든 트윗이 객체가 리턴된다
    .then(mapOptionalTweet); // 아이디를 표함 할 수 있게 만든다
}

export async function update(id, text) {
  return getTweets() // 그냥 updateOne 업데이트만하고 변경 결과를 리턴안함. 그래서 findOneAndUpdate 사용
    .findOneAndUpdate(
      { _id: new ObjectID(id) }, // 검색 조건으로 찾은다음
      { $set: { text } }, // 생략한거임. 원래는 {text: text}
      { returnOriginal: false } // 변경 이후의 상태를 리턴해줘라
    )
    .then((result) => result.value)
    .then(mapOptionalTweet); // 아이디를 표함 할 수 있게 만든다
}

export async function remove(id) {
  return getTweets().deleteOne({ _id: new ObjectID(id) });
}

// 다만 이렇게 map을 하더라도 몽고디비에 id라는 필드값이 생기는 것은 아니다.
// ⭐️ 프론트엔드에서는 id라는 이름으로 사용하기에 그에 맞는 형태를 추가하여 클라이언트에게 리턴해야한다.
function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}
