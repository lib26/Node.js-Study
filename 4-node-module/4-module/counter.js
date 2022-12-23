let count = 0;

function increase() {
  count++;
}

function getCount() {
  return count;
}

// 노드에서 옛날에 쓰던 export 방식

module.exports.getCount = getCount;
module.exports.increase = increase;
console.log(module.exports === exports);
// exports = {};
// console.log(module.exports === exports);
exports.increase = increase;
console.log(module);
