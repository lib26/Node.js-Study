import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication Error' };

// isAuth의 역할은 모든 요청에 Authorization이 있는지 검증하는 미들웨어
export const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization'); // request 헤더 안에 Authorization이라는 헤더의 값을 가져온다
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR); // Authorization가 헤더에 아예 없는 사람이면 여기서 걸러준다.
  }

  // auth가 있다면 이제 토큰 값을 가져온다
  const token = authHeader.split(' ')[1];

  // TODO: Make it secure!
  // 받아온 토큰이 유효한지 판단한다
  jwt.verify(
    token, // 받아온 토큰 값
    'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z', // 시크릿 키
    async (error, decoded) => {
      if (error) {
        return res.status(401).json(AUTH_ERROR);
      }

      // decoded에는 토큰 만들 때 넣어준 payload 값이 오브젝트로 들어있음. 그중 유저 id를 가져오겠다 라는 뜻
      // 요청해서 보낸 request 헤더에 담긴 jwt토큰이 발견되었을지라도
      // 실제로 유저 id가 DB에 존재하는 즉, 회원 가입된 id인지 한번더 검증 확인한다. (유저 id는 회원가입 할 때 생성되는 data)
      // 근데 요거는 생략 가능함.
      const user = await userRepository.findById(decoded.id);
      if (!user) {
        return res.status(401).json(AUTH_ERROR);
      }

      // 앞으로 이어지는 미들웨어에서도 동일하게 접근해야하는 데이터라면
      // 이렇게 내가 만든 커스텀 데이터를 request에 등록해줄 수 있다
      req.userId = user.id; // req.customData 즉, bob이면 '1'을 할당
      next();
    }
  );
};
