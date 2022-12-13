import express, { Express, Request, Response } from 'express';
import 'module-alias/register';
import newsRouter from './Routes/news.route';
import schedule from 'node-schedule';
import { NewsScheduler } from './Services/scheduler.service';
const dotenv = require('dotenv');

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use('/news', newsRouter);

schedule.scheduleJob('* * * * *', NewsScheduler);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
