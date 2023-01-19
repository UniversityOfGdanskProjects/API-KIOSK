import express, { Express } from 'express';
import { connectToDB } from './Configs/db.config';
import cors from 'cors';
import majorsRouter from './Routes/majors.route';
import loginRouter from './Routes/login.route';
import lessonsPlansRouter from './Routes/lessonsPlans.route';
import staffRouter from './Routes/staff.route';
import schedule from 'node-schedule';
import { updateLessons } from './Schedulers/lessonsPlans.scheduler';

const app: Express = express();
const port = 3001;

connectToDB();

app.use(express.json());
app.use(cors());

app.use(majorsRouter);
app.use(loginRouter);
app.use(lessonsPlansRouter);
app.use(staffRouter);

schedule.scheduleJob('lessonsPlanUpdate', '0 0 * * *', updateLessons);

const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export { app, server };
