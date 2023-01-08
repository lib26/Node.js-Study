import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId); // cookie header
  setToken(res, token);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const token = createJwtToken(user.id);
  setToken(res, token);
  res.status(200).json({ token, username });
}

// 로그아웃을 하면 헤더 쿠키에 토큰을 빈칸으로 리셋해서 보낸다
export async function logout(req, res, next) {
  res.cookie('token', '');
  res.status(200).json({ message: 'User has been logged out' });
}

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

// 서버에서 토큰을 해더의 쿠키로 브라우저에 전달
function setToken(res, token) {
  const options = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  };
  res.cookie('token', token, options); // HTTP-ONLY 🍪
  // 쿠키를 받은 브라우저는 해더에 쿠키를 자동 포함해서 서버랑 통신한다
  // 따라서 auth 미들웨어에서 유효 검사를 해줘야한다
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ token: req.token, username: user.username });
}

export async function csrfToken(req, res, next) {
  const csrfToken = await generateCSRFToken();
  res.status(200).json({ csrfToken });
}

async function generateCSRFToken() {
  return bcrypt.hash(config.csrf.plainToken, 1);
}
