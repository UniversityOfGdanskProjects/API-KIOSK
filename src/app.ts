import lessonsPlansRouter from './Routes/lessonsPlans.route';
import majorsRouter from './Routes/majors.route';
import loginRouter from './Routes/login.route';
import staffRouter from './Routes/staff.route';
import newsRouter from './Routes/news.route';
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use(majorsRouter);
app.use(loginRouter);
app.use(lessonsPlansRouter);
app.use(staffRouter);
app.use(newsRouter);

app.get('/', (req: Request, res: Response) =>
    res.status(200).send('API-KIOSK')
);

export { app };
