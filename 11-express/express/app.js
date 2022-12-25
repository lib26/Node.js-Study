import express from 'express';

const app = express();

//express에서 body의 내용을 읽기 위해서 요청에서 들어오는 body를 파싱해주는 미들웨어를 사용해야함
app.use(express.json());

// 근데 이런식으로 app 안에서 라우터를 등록해서 처리하면
// 수많은 url이 있는 복잡한 서버에서 가독성이 떨어진다.
// app-route.js 처럼하자
app
  .route('/posts')
  .get((req, res, next) => {
    res.status(201).send('GET: /posts');
  })
  .post((req, res) => {
    res.status(201).send('POST: /posts');
  });

app
  .route('/posts/:id')
  .put((req, res) => {
    res.status(201).send('PUT: /posts/:id');
  })
  .delete((req, res) => {
    res.status(201).send('DELETE: /posts/:id');
  });

app.listen(8080);

// IP : 우리의 서버가 네트워크 상 어디에 있는지
// Port : 그 서버의 어떤 어플리케이션에 접속하길 원하는지
