import { connectToDB } from './Configs/db.config';
import express, { Express } from 'express';
import loginRouter from './Routes/login.route';
import workersRouter from './Routes/workers.route';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

connectToDB();

app.use(express.json());

app.use(loginRouter);
app.use(workersRouter);

const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export { app, server };
