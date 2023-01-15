import express, { Express } from 'express';
import { connectToDB } from './Configs/db.config';
import majorsRouter from './Routes/majors.route';
import loginRouter from './Routes/login.route';
import workersRouter from './Routes/workers.route';
import dotenv from 'dotenv';

const app: Express = express();
const port = 3001;

connectToDB();

app.use(express.json());

app.use(majorsRouter);
app.use(loginRouter);
app.use(workersRouter);

const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export { app, server };
