import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Assignment 4!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/tasks', (req, res) => {
  res.json([
    { id: 1, title: 'Learn CI/CD', completed: true },
    { id: 2, title: 'Deploy to Render', completed: false }
  ]);
});

export default app;