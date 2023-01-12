import { connectToDB } from './Configs/db.config';
import express, { Express } from 'express';
import loginRouter from './Routes/login.route';

const app: Express = express();
const port = 3001;

connectToDB();

app.use(express.json());

app.use(loginRouter);

const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export { app, server };
