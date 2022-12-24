// Emitter는 커스텀 이벤트를 만들어서 발생키는 개념
const EventEmitter = require('events');
const emitter = new EventEmitter();

const callback1 = (args) => {
  console.log('first callback - ', args);
};
emitter.on('ellie', callback1);

emitter.on('ellie', (args) => {
  console.log('second callback - ', args);
});

emitter.emit('ellie', { message: 1 });
emitter.emit('ellie', { message: 2 });
emitter.removeAllListeners();
emitter.emit('ellie', { message: 3 });
