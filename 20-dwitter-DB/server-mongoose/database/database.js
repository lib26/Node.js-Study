import Mongoose from 'mongoose';
import { config } from '../config.js';

export async function connectDB() {
  return Mongoose.connect(config.db.host, {
    useNewUrlParser: true, // 옵션들
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}

// 가상의 id를 만들어서 코드상에서는 id라고 표기되도록 함
// 하지만 문서가 create될 때 DB에는 이 가상 id가 포함되지 않지만
// front에게 응답을 보낼 때 포함된다.
// json과 object에도 포함되도록 함
export function useVirtualId(schema) {
  // _id -> id
  schema.virtual('id').get(function () {
    return this._id.toString(); // 여기서 this는 schema
  });
  schema.set('toJSON', { virtuals: true });
  schema.set('toOject', { virtuals: true });
}
