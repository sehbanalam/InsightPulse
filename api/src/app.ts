import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port = 3000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello from Express with TypeScript!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});