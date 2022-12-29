import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as tweetController from '../controller/tweet.js';
import { isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';
// import 순서는 보통 외부 라이브러리 먼저 써주고
// 우리 플젝에서 쓰는 것들을 그 아래에 나열함.

const router = express.Router();

// 유효성 검사는 route쪽에서 해주자
// controller에서는 비지니스 로직만 신경쓰도록..(모델과 통신, 데이터 교환)
// 검사하는 순서 중요함
const validateTweet = [
  body('text')
    .trim() // 공백 제거
    .isLength({ min: 3 }) // 최소 3개 이상
    .withMessage('text should be at least 3 characters'),
  validate, // 유효성 검사하는 미들웨어 실행
];

// GET /tweet
// GET /tweets?username=:username
router.get('/', isAuth, tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', isAuth, tweetController.getTweet);

// POST /tweeets
router.post('/', isAuth, validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', isAuth, validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', isAuth, tweetController.deleteTweet);

export default router;
