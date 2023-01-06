import { validationResult } from 'express-validator';

// 많은 라우터에서 쓰일 것이기 때문에 이렇게 따로 유효성 검사 파일을 만들었다.
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next(); // 유효성 검사가 통과하면 다음 미들웨어로 넘어간다
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};
