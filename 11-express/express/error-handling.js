import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';
import 'express-async-errors';

const app = express();
app.use(express.json());

app.get('/file1', (req, res) => {
  // 동기. 파일이 읽힐 때까지 밑에 수행 안됨
  // 해당 미들웨어에서 try catch로 에러 처리
  // 만약 try catch를 안쓰면 마지막 최종 안정망 미들웨어에서 에러를 포착한다
  try {
    const data = fs.readFileSync('/file1.txt');
    res.send(data);
  } catch (error) {
    res.sendStatus(404);
  }

  // readFile는 비동기적으로 파일을 읽는다.
  // 만약 에러가 발생했다면 콜백함수에서 에러 처리를 해줘야 다음 미들웨어로 넘어갈 수 있다.
  fs.readFile('/file1.txt', (err, data) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
});

// promise는 try catch로 에러를 잡을 수 없다.
// 아래와 같이 promise는 내부적으로 catch를 써서 에러 잡기
app.get('/file2', (req, res, next) => {
  fsAsync
    .readFile('/file.txt') //promise
    .then((data) => res.send(data)) // 프로미스에서 resolve될 때 반환한 값이 data에 들어가게 된다. 즉, 읽혀진 파일이 data에 할당된다
    .catch((error) => res.status(404).send('File not found'));
});

// async로 묶여있는 function 자체는 promise를 리턴한다
// 그래서 이 비동기 함수 안에서 발생한 error는 안정망 미들웨어로 가지 않는다.
// 따라서 promise 내부적으로 catch를 써서 에러 잡아야한다. 즉, 에러처리 미들웨어로 못잡는다
// await가 동기적인 표현이라서?? try catch로 잡아야한다
app.get('/file3', async function (req, res) {
  try {
    const data = await fsAsync.readFile('/file2.txt'); // readFile이 promise라서 앞에 await를 써줘서 기다리겠다는 의미
  } catch (error) {
    res.status(404).send('File not found');
  }
});

// 에러를 처리해주는 최종 안정망 미들웨어
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong' }); // 오브젝트 전달 방식
});

app.listen(8080);
