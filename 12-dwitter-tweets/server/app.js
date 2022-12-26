import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetsRouter from './router/tweets.js';

const app = express();

app.use(express.json()); // req.body를 보기 위한 express 내부 미들웨어
app.use(helmet()); // 공통적으로 보안에 필요한 정보들을 헤더에 적어준다
app.use(cors());
app.use(morgan('tiny')); // 사용자에게 요청을 받을 때마다 어떤 요청을 얼마나 걸렸는지에 대한 정보들을 로그로 남기고 싶을 때 한번에 해줌

// 모든 /tweets 이라는 경로의 요청은 tweetsRouter로 간다
app.use('/tweets', tweetsRouter);

// 사용자로부터 앱에 다른 url 요청이 왔을 때 우리가 처리할 수 없다면 not found 존재하지 않는 url인 404를 보낸다
app.use((req, res, next) => {
  res.sendStatus(404);
});

// 최종 에러 처리 미들웨어
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

// 서버 open
app.listen(8080);
