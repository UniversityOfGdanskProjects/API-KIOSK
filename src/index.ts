import { connectToDB } from './Configs/db.config';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import loginRouter from './Routes/login.route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

connectToDB();

app.use(express.json());

app.use(loginRouter);

const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export { app, server };
