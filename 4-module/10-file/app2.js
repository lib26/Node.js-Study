// 모든게 다 프로미스 즉, 비동기로 처리된다.
const fs = require('fs').promises;

// reading a file
fs.readFile('./text.txt', 'utf8') //
  .then((data) => console.log(data))
  .catch(console.error);

// writing a file
fs.writeFile('./file.txt', 'Hello, Dream Coders! :) ') //
  .catch(console.error);

fs.appendFile('./file.txt', 'Yo!, Dream Coders! :) ') //
  .catch(console.error);

// copy
fs.copyFile('./file.txt', './file2.txt') //
  .catch(console.error);

// folder
fs.mkdir('sub-folder') //
  .catch(console.error);

fs.readdir('./') //
  .then(console.log)
  .catch(console.error);
