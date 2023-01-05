import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: '*', // 어디서 오는 클라이언트든 다 받겠다? 그런의미 일듯
      },
    });

    this.io.use((socket, next) => {
      // const token = socket.handshake.query 는 브라우저 콘솔에서도 토큰이 보일 수 있다.
      // 소켓을 이용해서 토큰을 주고받을 때는 표준으로 정해진 socket.handshake.auth 안에서 토큰을 사용해야한다(보안 목적)
      const token = socket.handshake.auth.token;
      // 소켓 통신을 할 때 토큰이 없다면(로그인 안된사람이면) 연결 못함
      if (!token) {
        return next(new Error('Authentication error'));
      }
      // jwt 토큰을 해독불가하면 다음 미들웨어로 에러를 던진다.
      jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
        if (error) {
          return next(new Error('Authentication error'));
        }
        next();
      });
    });

    this.io.on('connection', (socket) => {
      console.log('Socket client connected');
    });
  }
}

// 소켓 생성. 기존 소켓이 없을 때 소켓을 생성한다.
let socket;
export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server);
  }
}

// 소켓 전달하기
export function getSocketIO() {
  if (!socket) {
    throw new Error('Please call init first');
  }
  return socket.io;
}
