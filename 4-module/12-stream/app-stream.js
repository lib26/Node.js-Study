const fs = require('fs');

const data = [];
// 버퍼에 있는 데이터를 스트리밍해서(조금조금씩) 읽는다

fs.createReadStream('./file.txt', {
  //   highWaterMark: 8, // 64 kbytes 스트림이 한번에 처리할 수 있는 양. 기본이 64kb인듯
  //   encoding: 'utf-8',
})
  .once('data', (chunk) => {
    // 데이터가 들어오면 그 덩어리들을 data.push 한다
    // console.log(chunk);
    data.push(chunk);
    console.count('data');
  })
  .on('end', () => {
    // 다 읽어오면 한 문장으로 연결시킴
    console.log(data.join(''));
  })
  .on('error', (error) => {
    console.log(error);
  });
