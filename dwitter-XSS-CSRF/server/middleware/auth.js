import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication Error' };

export const isAuth = async (req, res, next) => {
  // 1. Cookie (for Browser) // 쿠키에 토큰이 있는지 없는지 확인해야한다
  // 2. Header (for Non-Browser Client) 헤더에 토큰이 있는지 없는지 확인해야한다

  let token;
  // check the header first
  const authHeader = req.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  // if no token in the header, check the cookie
  if (!token) {
    token = req.cookies['token'];
  }

  // 헤더 쿠키 둘다 없으면 에러 발생
  if (!token) {
    return res.status(401).json(AUTH_ERROR);
  }

  // 기존 로직 동작
  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id; // req.customData
    req.token = token;
    next();
  });
};
