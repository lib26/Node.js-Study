console.log('logging....');
console.clear();

// log level
console.log('log'); // 개발
console.info('info'); // 정보
console.warn('warn'); // 경보
console.error('error'); // 에러, 사용자 에러, 시스템 에러

// assert
console.assert(2 === 3, 'not same!'); // 참이 아닌경우 출력한다
console.assert(2 === 2, 'same!');

// print object
const student = { name: 'ellie', age: 20, company: { name: 'AC' } };
console.log(student);
console.table(student); //이쁘게 테이블 형태로 출력
console.dir(student, { showHidden: true, colors: false, depth: 0 });

// measuring time
console.time('for loop'); // 성능 확인할 때 유용
for (let i = 0; i < 10; i++) {
  i++;
}
console.timeEnd('for loop');

// counting
function a() {
  console.count('a function');
}
a();
console.countReset('a function');
a();

// trace
function f1() {
  f2();
}
function f2() {
  f3();
}
function f3() {
  console.log('f3');
  console.trace(); // 디버깅할 때 consol trace를 쓰면 어디서 이 함수를 호출했는지 알 수 있따.
}
f1();
