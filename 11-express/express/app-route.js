import express from 'express';
import postRouter from './router/post.js';
import userRouter from './router/user.js';

const app = express();

// express 내부적으로 지원하는 유용한 미들웨어
app.use(express.json());
// REST API에서 Body를 파싱할 때 쓴다. 즉 편하게 body를 읽어온다.
app.use(express.urlencoded({ extended: false }));
// HTML Form 태그에서 submit을 할 때 자동으로 req발생하는데 그 데이터를 Body안으로 파싱해준다.

const options = {
  dotfiles: 'ignore', // 숨겨진 파일은 보여지지 않도록
  etag: false,
  index: false,
  maxAge: '1d', // 얼마나 오래동안 캐시가 가능한지
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now()); // 헤더에 보낼 때 필요한 데이터가 있다면 추가해서 정보를 보낸다
  },
};

// express 내부적으로 지원하는 유용한 미들웨어
// 퍼블릭에 있는 리소스를 사용자가 읽을 수 있게 만든다는 설정
// localhost:8080/index.html로 사용할 수 있다.
app.use(express.static('public', options));

// 이걸 보고 우리 큰 도메인에 users와 posts가 있다는 것을 유추 할 수 있다.
// 이런식으로 라우터를 이용하면 모듈처럼 이용할 수 있다.
app.use('/posts', postRouter); // /posts가 상위 root 경로가 된다.
app.use('/users', userRouter); // /users가 상위 root 경로가 된다.

app.listen(8080);
