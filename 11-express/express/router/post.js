import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  // 경로는 localhost:8080/post/와 같은 의미
  res.status(201).send('GET: /posts');
});

router.post('/', (req, res) => {
  res.status(201).send('POST: /posts');
});

router.put('/:id', (req, res) => {
  res.status(201).send('PUT: /posts/:id');
});

router.delete('/:id', (req, res) => {
  res.status(201).send('DELETE: /posts/:id');
});

export default router;
