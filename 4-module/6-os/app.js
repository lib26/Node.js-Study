// 노드가 동작하고 있는 os 정보를 가져오는 방법
const os = require('os');

console.log(os.EOL === '\n');
console.log(os.EOL === '\r\n');

console.log(os.totalmem());
console.log(os.freemem());
console.log(os.type());
console.log(os.userInfo());
console.log(os.cpus());
console.log(os.homedir());
console.log(os.hostname());
