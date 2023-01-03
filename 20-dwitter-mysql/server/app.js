import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import { config } from './config.js';
import { initSocket } from './connection/socket.js';
import { db } from './db/database.js';

const app = express();

// express 내부적으로 지원하는 유용한 미들웨어
app.use(express.json()); // REST API에서 Body를 파싱할 때 쓴다. 즉 편하게 body를 읽어온다.
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

// 서버가 열릴 때 같이 소켓도 열어준다
const server = app.listen(config.host.port);
initSocket(server);
