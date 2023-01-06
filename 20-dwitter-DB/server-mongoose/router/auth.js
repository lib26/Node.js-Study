import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// 유효성 검사
const validateCredential = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('username should be at least 5 characters'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('password should be at least 5 characters'),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body('name').notEmpty().withMessage('name is missing'),
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('url')
    .isURL()
    .withMessage('invalid URL')
    .optional({ nullable: true, checkFalsy: true }), // 옵션이니까 데이터가 없거나 텅텅빈 문자열이어도 허용해준다
  validate,
];

// POST /auth/signup
router.post('/signup', validateSignup, authController.signup);

// POST /auth/login
router.post('/login', validateCredential, authController.login);

// GET /auth/me
// 로그인이 되어있다면 isAuth로 토큰을 확인하고 컨트롤러 처리
router.get('/me', isAuth, authController.me);

export default router;
