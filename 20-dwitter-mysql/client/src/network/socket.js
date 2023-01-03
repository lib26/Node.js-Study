import socket from 'socket.io-client';

export default class Socket {
  // 소켓 통신할 때도 클라이언트가 갖고있는 jwt 토큰을 주고받는다
  constructor(baseURL, getAccessToken) {
    this.io = socket(baseURL, {
      auth: (cb) => cb({ token: getAccessToken() }),
    });

    this.io.on('connect_error', (err) => {
      console.log('socket error', err.message);
    });
  }

  onSync(event, callback) {
    if (!this.io.connected) {
      this.io.connect(); // 연결
    }

    this.io.on(event, (message) => callback(message));
    return () => this.io.off(event);
  }
}
