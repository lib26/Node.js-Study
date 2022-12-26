export default class TweetService {
  constructor(baseURL) {
    this.baseURL = baseURL; // http://localhost:8080
  }

  async getTweets(username) {
    let query = username ? `?username=${username}` : '';
    const response = await fetch(`${this.baseURL}/tweets${query}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }, // json 형식으로 받겠다
    });
    const data = await response.json(); // 응답을 json으로 변환한다
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
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
    const data = await response.json(); // 응답을 json으로 변환한다
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
      const data = await response.json();
      throw new Error(data.message);
    }
    // delete는 일단 return 없이 만듦
  }

  async updateTweet(tweetId, text) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
}
