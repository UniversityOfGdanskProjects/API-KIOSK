import express from 'express';
import {
    getNewsMFI,
    getNewsINF,
} from '../../Controllers/Scrapers/news.controller';
const newsScraperRouter = express.Router();

newsScraperRouter.get('/mfi', getNewsMFI);
newsScraperRouter.get('/inf', getNewsINF);

export default newsScraperRouter;
