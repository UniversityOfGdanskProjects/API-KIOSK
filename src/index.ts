import express, { Express, Request, Response } from 'express';
const dotenv = require('dotenv');

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});