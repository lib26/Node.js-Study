const fs = require('fs');
const zlib = require('zlib'); //노드에서 제공하는 압축 라이브러리

const readStream = fs.createReadStream('./file.txt');
const writeStream = fs.createWriteStream('./file4.zip');
const zlibStream = zlib.createGzip();

// read스트림을 파이프로 연결해서 write스트림으로 써주는거. 근데 중간에 압축해서 보내주는거
const piping = readStream.pipe(zlibStream).pipe(writeStream);

// 파이핑이 다 끝나면 콜백함수를 호출한다.
piping.on('finish', () => {
  console.log('done!!');
});

// 나중에 서버만들 때 pipe를 쓴다.
const http = require('http');
const server = http.createServer((req, res) => {
  const stream = fs.createReadStream('./file.txt');
  stream.pipe(res);
});

server.listen(3000);
