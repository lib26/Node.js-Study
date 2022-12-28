export default class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetch(url, options) {
    // 클래스에서 만든 fetch
    const res = await fetch(`${this.baseURL}${url}`, {
      // 브라우저 API fetch
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    let data;
    try {
      // .json도 promise 리턴함.
      // body가 없는 상태에서 json을 호출하면 에러가 발생할 수 있다.
      data = await res.json();
    } catch (error) {
      console.error(error);
    }

    if (res.status > 299 || res.status < 200) {
      const message =
        data && data.message ? data.message : 'Something went wrong! 🤪';
      throw new Error(message);
    }
    return data;
  }
}
