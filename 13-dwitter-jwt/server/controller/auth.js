import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';

// TODO: Make it secure!
const jwtSecretKey = 'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z'; // 시크릿 키
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

// 회원 가입
export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);
  // 이미 생성된 ID 이면
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  // 토큰 생성
  const token = createJwtToken(userId); // 로그인 ID가 아닌 DB에서 활용하는 고유 ID임.
  res.status(201).json({ token, username });
}

// 로그인
export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  // 존재하지 않는 아이디 이면
  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  // 일치하지 않는 비밀번호 이면
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  // 토큰 생성
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
}

// 토큰 생성
function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
  // 파라미터는 순서대로 payload(userID), 시크릿키, 만료옵션(선택사항)
}

//
export async function me(req, res, next) {
  // 한번 더 DB에 존재하는지 확인
  const user = await userRepository.findById(req.userId); // req.userId = isAuth에서 만든 customdata
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ token: req.token, username: user.username });
}
