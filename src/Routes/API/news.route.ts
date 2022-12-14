import express from 'express';
import { getNews, getNewsDetail } from '../../Controllers/API/news.controller';
const newsAPIRouter = express.Router();

newsAPIRouter.get('/', getNews);
newsAPIRouter.get('/:id', getNewsDetail);

export default newsAPIRouter;
