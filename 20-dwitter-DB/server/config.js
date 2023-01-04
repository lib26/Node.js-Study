import dotenv from 'dotenv';

// 개발할 때 .env에 있는 값들을 가져오고자 할 때 이렇게 해서 자동완성을 적용시킬 수 있다.
// 이렇게 안하고 바로 .env파일에서
// .env 안에 환경 변수의 값이 정의되어있는지 아닌지 확인하는 함수
// 개발 단계에서 서버를 시작하자마자 모든 것을 확인할 수 있다
// 이렇게 코딩하면 나중에 .env에서 환경변수만 바꿔주면 포트나 시크릿 키를 간단하게 수정할 수 있다

dotenv.config();

function required(key, defaultValue = undefined) {
  // .env 파일에서 환경변수 값을 받아온다
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required('JWT_SECRET'),
    expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
  },
  host: {
    port: parseInt(required('HOST_PORT', 8080)),
  },
  db: {
    host: required('DB_HOST'),
    user: required('DB_USER'),
    databse: required('DB_DATABASE'),
    password: required('DB_PASSWORD'),
    port: required('DB_PORT'),
  },
};
