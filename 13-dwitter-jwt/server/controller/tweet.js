import { getSocketIO } from '../connection/socket.js';
import * as tweetRepository from '../data/tweet.js';

// ----------------getTweets---------------------------
export async function getTweets(req, res) {
  const username = req.query.username;
  const data = await (username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll());
  res.status(200).json(data);
}
// ----------------getTweet----------------------------
export async function getTweet(req, res, next) {
  const id = req.params.id; // 트윗 id
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

// -----------------createTweet----------------------------
export async function createTweet(req, res, next) {
  const { text } = req.body;
  const tweet = await tweetRepository.create(text, req.userId);
  res.status(201).json(tweet);
  // 새로운 트윗을 만들 때 마다 소켓에게 tweet이 생성되었다고 broadcast한다.
  getSocketIO().emit('tweets', tweet);
}

// -----------------updateTweet----------------------------
export async function updateTweet(req, res, next) {
  const id = req.params.id; // 트윗 id
  const text = req.body.text;
  const tweet = await tweetRepository.getById(id);

  // url에 입력한 tweet id에 해당하는 tweet이 존재하지 않으면 404(=잘못된 url) 에러를 보낸다.
  if (!tweet) {
    return res.status(404).json({ message: `Tweet not found: ${id}` });
  }

  // 나의 tweet이 아닌 것을 수정하려고하면 막는다
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403); // 403 = Forbidden 에러 : 로그인되긴했지만 너는 접근 못한다
  }

  const updated = await tweetRepository.update(id, text);
  res.status(200).json(updated);
}

// -----------------deleteTweet----------------------------
export async function deleteTweet(req, res, next) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    return res.status(404).json({ message: `Tweet not found: ${id}` });
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await tweetRepository.remove(id);
  res.sendStatus(204);
}
