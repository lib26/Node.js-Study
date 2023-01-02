// bob 비번 : abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm
let users = [
  {
    id: '1', // 유저 DB에서 활용할 고유 ID.
    username: 'bob', // 로그인 할 때 ID
    password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm', // 비번이 암호화 된 값
    name: 'Bob',
    email: 'bob@gmail.com',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
  {
    id: '2',
    username: 'ellie',
    password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
    name: 'Ellie',
    email: 'ellie@gmail.com',
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username); // user(promise) 리턴
}

export async function findById(id) {
  return users.find((user) => user.id === id); // user(promise) 리턴
}

// 회원가입 할 때 고유 ID를 만들어줌
export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}
