import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import pool from './db';
import dotenv from 'dotenv'

dotenv.config()

interface Todo {
  id: number;
  value: string;
  done: boolean;
  completed_at: string;
}

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/todos', async (req: Request, res: Response) => {
  const search: string = req.query.search as string || '';
  const doneLimit = 10;

  const { rows } = await pool.query<Todo>(
    `
      SELECT *
      FROM todos
      WHERE value ILIKE $1
      ORDER BY value
    `,
    [`%${search}%`]
  );

  const todo = rows
    .filter((todo) => !todo.done)
    .sort((a, b) => a.value.localeCompare(b.value));

  const done = rows
    .filter((todo) => todo.done)
    .sort((a, b) => (new Date(b.completed_at) as any) - (new Date(a.completed_at) as any))
    .slice(0, doneLimit)
    .sort((a, b) => a.value.localeCompare(b.value));

  res.json({ todo, done });
});

app.post('/api/todos', async (req: Request, res: Response) => {
  const { value, done } = req.body as { value: string; done: boolean };
  const { rows } = await pool.query<Todo>(
    'INSERT INTO todos (value, done) VALUES ($1, $2) RETURNING *',
    [value, done]
  );
  res.status(201).json(rows[0]);
});

app.patch('/api/todos', async (req: Request, res: Response) => {
  const { id, done } = req.body as { id: number; done: boolean };
  const completed_at = done ? new Date() : null;
  const { rows } = await pool.query<Todo>(
    'UPDATE todos SET done = $1, completed_at = $2 WHERE id = $3 RETURNING *',
    [done, completed_at, id]
  );
  res.json(rows[0]);
});

app.delete('/api/todos', async (req: Request, res: Response) => {
  await pool.query('DELETE FROM todos');
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});