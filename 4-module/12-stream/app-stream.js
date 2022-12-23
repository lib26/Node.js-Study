const fs = require('fs');

const readStream = fs.createReadStream('./file.txt', {
  //   highWaterMark: 8, // 64 kbytes
  //   encoding: 'utf-8',
});

const beforeMem = process.memoryUsage().rss;
const data = [];
readStream.once('data', (chunk) => {
  // console.log(chunk);
  data.push(chunk);
  console.count('data');
  readStream.close();
});

readStream.on('close', () => {
  console.log(data.join(''));
  // calculate
  const afterMem = process.memoryUsage().rss;
  const diff = afterMem - beforeMem;
  const consumed = diff / 1024 / 1024;
  console.log(diff);
  console.log(`Consumed Memory: ${consumed}MB`);
});
readStream.on('error', (error) => {
  console.log(error);
});
