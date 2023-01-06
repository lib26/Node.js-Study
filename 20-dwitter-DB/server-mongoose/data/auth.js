import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';

// nosql에는 스키마가 없지만 ODM에서는 쓸 수 있다.
const userSchema = new Mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
});

// _id -> id
useVirtualId(userSchema);

// user라는 collection이 userSchema를 따르도록한다. 즉 잘못되면 에러발생
const User = Mongoose.model('User', userSchema);

export async function findByUsername(username) {
  return User.findOne({ username });
}

export async function findById(id) {
  return User.findById(id);
}

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}
