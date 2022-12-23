// 노드에서 쓰던 옛날 방식의 import
const counter = require('./counter.js');

counter.increase();
counter.increase();
counter.increase();
console.log(counter.getCount());
