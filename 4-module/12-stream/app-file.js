const fs = require('fs');

// 💩
const beforeMem = process.memoryUsage().rss;

// 얘는 파일을 한번에 다 받아오는 거. 스트리밍 아님
fs.readFile('./file.txt', (_, data) => {
  fs.writeFile('./file2.txt', data, () => {});
  // calculate
  const afterMem = process.memoryUsage().rss;
  const diff = afterMem - beforeMem;
  const consumed = diff / 1024 / 1024;
  console.log(diff);
  console.log(`Consumed Memory: ${consumed}MB`);
});
