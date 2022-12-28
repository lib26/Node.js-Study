import express from 'express';
import { body, param, validationResult } from 'express-validator';

const app = express();
app.use(express.json());

// 유효성 검사 처리 함수
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next(); // 에러가 없다면 다음 미들웨어로 넘어간다
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};

// request로 오는 body 유효성 검사
app.post(
  '/users',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('이름은 두글자 이상!'),
    body('age').isInt().withMessage('숫자를 입력해'),
    body('email').isEmail().withMessage('이메일 입력해요').normalizeEmail(),
    body('job.name').notEmpty(),
    validate,
  ],
  (req, res, next) => {
    console.log(req.body);
    res.sendStatus(201);
  }
);

// url 파라미터 유효성 검사
app.get(
  '/:email',
  [param('email').isEmail().withMessage('이메일 입력해요'), validate],
  (req, res, next) => {
    res.send('💌');
  }
);

app.listen(8080);
