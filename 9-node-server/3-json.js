const http = require('http');

const courses = [
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'JS' },
  { name: 'Node' },
  { name: 'Frontend' },
];

// 이전과는 다르게 HTML이 아닌 JSON형태로 response해주는 서버를 만들어보자
const server = http.createServer((req, res) => {
  const url = req.url; // what? 클라이언트가 무엇을 원하는지
  const method = req.method; // how?, action? 그것으로 어떤걸 하고싶은지
  if (url === '/courses') {
    if (method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      // object를 json으로 변환해서 보낸다
      res.end(JSON.stringify(courses));
    } else if (method === 'POST') {
      const body = [];
      // data라는 이벤트가 발생하면 받은 덩어리를 배열에 밀어서 추가한다.
      req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk);
      });
      // 모든 data가 받아지는 end라는 이벤트가 발생하면 콜백함수가 실행된다
      req.on('end', () => {
        const bodyStr = Buffer.concat(body).toString();
        const course = JSON.parse(bodyStr); // string을 json으로 변환
        courses.push(course);
        console.log(course);
        // 응답을 클라이언트한테 보내준다.
        // 브라우저에서는 post 동작을 확인 못하니 postman 사용
        res.writeHead(201);
        res.end();
      });
    }
  }
});

server.listen(8090);
