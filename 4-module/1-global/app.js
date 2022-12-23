// VSC가 노드인지 브라우저인지 확인시키기 위해 노드 모듈 하나를 import한다
const fs = require('fs');

// node에서의 글로벌 객체 (전역 객체)는 global이라고 한다.
// 반대로 브라우저에서의 글로벌 객체는 Window이다.
console.log(global);

// 전역 객체에 hello 함수를 정의할 수 있다.
global.hello = () => {
  // 사실 console.log도 전역 객체를 사용했던 것..
  global.console.log('hello11');
};

global.hello();

// 생략 가능
hello();
