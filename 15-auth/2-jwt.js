const jwt = require('jsonwebtoken');

// 토큰 생성
const secret = 'fSTWh2471^%Vw9dmUyYR$BXL*VJhq&N&';
const token = jwt.sign(
  {
    // payload
    // 사용자에대한 정보 등을 적으면 될듯
    id: 'ellie',
    isAdmin: false,
  },
  secret, // 시크릿 key
  { expiresIn: 2 } // 2초 안에 만료. 이거 안해주면 평생 쓸 수 있는 토큰이 생성된다.
);

// 위에서 만들어진 토큰의 만료 시간을 태스트 해본다
setTimeout(() => {
  jwt.verify(token, secret, (error, decoded) => {
    console.log(error, decoded);
    // 만약 인증 성공시
    // error : null
    // decoded : { id: 'ellie', isAdmin: false, iat: 1672328616, exp: 1672328618 }
  });
}, 1000);

console.log(token);
