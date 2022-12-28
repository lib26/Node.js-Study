import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';
// import 'express-async-errors'; 이거 익스프레스5 이상부터는 안해줘도 됨

const app = express();

app.use(express.json());

// error handle 최신버전
// express 5 이상부터는 promise를 리턴해주면 별다른 에러처리를 안해줘도
// 마지막 에러처리 미들웨어에서 해줄 수 있다.
// 하지만 각각의 미들웨어에서 에러처리 메세지를 사용자에게 보내는 것이 좋은듯하다.

// promise 리턴하는 미들웨어는 에러처리 미들웨어에서 감지한다
app.get('/file2', async (req, res) => {
  return fsAsync // 앞에 return을 붙임으로써 promise에서 발생한 에러도 내부에서 처리하는 것이 아닌 외부 에러처리 미들웨어에서도 감지할 수 있다.
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
