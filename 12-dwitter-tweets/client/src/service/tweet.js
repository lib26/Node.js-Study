export default class TweetService {
  constructor(baseURL) {
    this.baseURL = baseURL; // http://localhost:8080
  }

  // 비동기 함수이지만 내부에서는 await가 prmoise를 반환하는 함수 앞에 붙어서 기다리는 동기적 절차를 진행할 수 있다.
  async getTweets(username) {
    let query = username ? `?username=${username}` : '';
    const response = await fetch(`${this.baseURL}/tweets${query}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }, // json 형식으로 받겠다
    });
    const data = await response.json(); // 서버로부터 받은 응답을 json를 obj로 변환한다
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data; // data를 resolve하는 promise 객체 반환
  }

  async postTweet(text) {
    const response = await fetch(`${this.baseURL}/tweets/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // post는 body를 전달해줘야함.
        // stringify란 obj를 json으로 변환
        text,
        username: 'ellie',
        name: 'Ellie',
      }),
    });
    const data = await response.json(); // 서버로부터 받은 응답을 json를 obj로 변환한다
    if (response.status !== 201) {
      throw new Error(data.message);
    }
    console.log(data);
    return data;
  }

  async deleteTweet(tweetId) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status !== 204) {
      const data = await response.json(); // 서버로부터 받은 응답을 json를 obj로 변환한다
      throw new Error(data.message);
    }
    // delete는 일단 return 없이 만듦
  }

  async updateTweet(tweetId, text) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }), // stringify란 obj를 json으로 변환
    });
    const data = await response.json(); // 서버로부터 받은 응답 json를 obj로 변환한다
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
}
