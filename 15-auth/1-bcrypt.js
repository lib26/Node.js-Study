const bcrypt = require('bcrypt');

// 해쉬된 비번은 DB에 저장될것
const password = 'abcd1234';
const hashed = bcrypt.hashSync(password, 10); // salt 길이는 10을 추천. 11부턴 처리시간이 길어짐
console.log(`password: ${password}, hashed: ${hashed}`);

// 사용자가 로그인할 때는 비교해준다.
// 여기서는 동기로했지만 서버에서 구현할 때는 비동기 방식으로 해줘야한다.
const result = bcrypt.compareSync('abcd1234', hashed); // true
console.log(result);
