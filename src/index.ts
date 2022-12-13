import express, { Express, Request, Response } from 'express';
import 'module-alias/register';
import newsRouter from './Routes/news.route';
import schedule from 'node-schedule';
import { NewsScheduler } from './Services/scheduler.service';
import mongoose, { ConnectOptions } from 'mongoose';
const dotenv = require('dotenv');

dotenv.config();
const app: Express = express();
const port = process.env.PORT;
mongoose.set('strictQuery', true);
app.use('/news', newsRouter);
mongoose.connect(
    'mongodb+srv://' +
        process.env.MONGO_USER +
        ':' +
        process.env.MONGO_PASSWORD +
        process.env.MONGO_PATH
);

schedule.scheduleJob('* * * * *', NewsScheduler);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
