const fs = require('fs');

// 3가지 방식이 있다
// rename(...., callback(error, data))
// try { renameSync(....) } catch(e) { } 동기적인 방식. 끝날때까지 기다림. 잘 사용안함
// promises.rename().then().catch(0)

//동기적인 방식
try {
  fs.renameSync('./text.txt', './text-new.txt');
} catch (error) {
  console.error(error);
}

//비동기적인 방식
fs.rename('./text-new.txt', './text.txt', (error) => {
  console.log(error);
});
console.log('hello');

fs.promises
  .rename('./text2.txt', './text-new.txt') //
  .then(() => console.log('Done!'))
  .catch(console.error);
