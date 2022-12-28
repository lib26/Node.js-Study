import express from 'express';
import 'express-async-errors';

// 아직 DB작업이 안되어있으니 local 메모리에 정보를 저장
// 그리고 서버에 let같은? state가 있는 건 매우 나쁘다
let tweets = [
  {
    id: '1',
    text: '드림코더분들 화이팅!',
    createdAt: Date.now().toString(),
    name: 'Bob',
    username: 'bob',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
  {
    id: '2',
    text: '안뇽!',
    createdAt: Date.now().toString(),
    name: 'Ellie',
    username: 'ellie',
  },
];
const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get('/', (req, res, next) => {
  console.log(req.query); // { username: 'bob' }
  const username = req.query.username; // 쿼리가 없는 경우에는 undefined
  const data = username
    ? tweets.filter((tweet) => tweet.username === username) // 유저네임 있으면 같은 사람 트윗 가져오고
    : tweets; // 유저네임 없으면 그냥 홈화면(모든 유저 트윗) 보여준다
  res.status(200).json(data); // filter로 만든 배열을 client에게 보낸다
});

// GET /tweets/:id
router.get('/:id', (req, res, next) => {
  console.log(req.params); // { id : '1' }
  const id = req.params.id;
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// POST /tweeets
router.post('/', (req, res, next) => {
  console.log(req.body); // { text: 'New Message', username: 'bob', naem: 'Bob' }
  const { text, name, username } = req.body; // object deconstruct
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets]; // tweets.push()는 젤 뒤에 넣어지니까 이렇게 표현
  res.status(201).json(tweet); // 새로 만들어진 트윗을 응답으로 보낸다
});

// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
  const id = req.params.id; // { id: '2' }
  const text = req.body.text; // string 타입 문자
  console.log(req.params);
  console.log(text);
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
  console.log(req.params); // { id: '2' }
  const id = req.params.id;
  tweets = tweets.filter((tweet) => tweet.id !== id);
  res.status(204).json(tweets);
});

export default router;
