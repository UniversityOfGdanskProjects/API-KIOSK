import express, { Express, Request, Response } from 'express';
import 'module-alias/register';
import newsRouter from './Routes/news.route';
const dotenv = require('dotenv');

dotenv.config();
const app: Express = express();

app.use('/news', newsRouter);

export default app;
