import express, { Express } from 'express';
import { connectToDB } from './Configs/db.config';
import cors from 'cors';
import majorsRouter from './Routes/majors.route';
import loginRouter from './Routes/login.route';
import staffRouter from './Routes/staff.route';
import eventsRouter from './Routes/events.route';
import schedule from 'node-schedule';
import { updateEvents } from './Schedulers/events.scheduler';

const app: Express = express();
const port = 3001;

connectToDB();

app.use(express.json());
app.use(cors());

app.use(majorsRouter);
app.use(loginRouter);
app.use(staffRouter);
app.use(eventsRouter);

schedule.scheduleJob('eventsUpdate', '0 0 * * *', updateEvents);

const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export { app, server };
