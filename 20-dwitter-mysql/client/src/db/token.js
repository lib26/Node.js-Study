const TOKEN = 'token';

export default class TokenStorage {
  saveToken(token) {
    // localStorage는 브라우저에서 쓸 수 있는 API
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  clearToken() {
    localStorage.clear(TOKEN);
  }
}
