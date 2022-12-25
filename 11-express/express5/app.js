import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';

const app = express();

app.use(express.json());

// error handle 최신버전
// express 5 이상부터는 promise를 리턴해주면 별다른 에러처리를 안해줘도
// 마지막 에러처리 미들웨어에서 해줄 수 있다.
// 하지만 각각의 미들웨어에서 에러처리 메세지를 사용자에게 보내는 것이 좋은듯하다.

// 비동기. callback에서 에러 처리
app.get('/file', (req, res) => {
  fs.readFile('/file1.txt', (err, data) => {
    if (err) {
      res.sendStatus(404);
    }
  });
});

// 동기. try catch로 에러 처리
app.get('/file1', (req, res) => {
  try {
    const data = fs.readFileSync('/file1.txt');
    res.send(data);
  } catch (error) {
    res.sendStatus(404);
  }
});

// promise 리턴하는 미들웨어는 에러처리 미들웨어에서 감지한다
app.get('/file2', async (req, res) => {
  return fsAsync
    .readFile('/file2.txt') //
    .then((data) => res.send(data));
});

// async로 감싸면 자동으로 promise 형태로 감싸져서 리턴이 된다.
// promise 리턴하는 미들웨어는 에러처리 미들웨어에서 감지한다
app.get('/file3', async function (req, res) {
  const data = await fsAsync.readFile('/file2.txt');
  res.send(data);
});

// 에러처리 미들웨어
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong' }); //오브젝트 전달 방식
});

app.listen(8080);
