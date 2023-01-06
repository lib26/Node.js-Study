import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import { config } from './config.js';
import { initSocket } from './connection/socket.js';
import { sequelize } from './db/database.js';

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionSuccessStatus: 200, // 옛날 브라우저 버전을 위한 설정
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOption));
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

// DB 연결이 잘 되면 서버를 실행한다
// sync는 우리 모델에서 정한 스키마가 DB 테이블로 존재하지 않으면 만들어준다
// then을 써서 위의 사항이 잘 만들어진다면 서버 동작
sequelize.sync().then(() => {
  console.log(`Server is started.... ${new Date()}`);
  const server = app.listen(config.port);
  initSocket(server);
});
