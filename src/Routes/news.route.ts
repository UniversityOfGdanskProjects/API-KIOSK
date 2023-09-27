import { getAllNews, getNewsDetail } from '../Controllers/news.controller';
import { Router } from 'express';

const newsRouter = Router();

newsRouter.get('/news', getAllNews);
newsRouter.get('/news/:id', getNewsDetail);

export default newsRouter;
