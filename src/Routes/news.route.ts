import express from 'express';
import { getNewsMFI, getNewsINF } from '@/Controllers/news.controller';
const newsRouter = express.Router();

newsRouter.get('/mfi', getNewsMFI);
newsRouter.get('/inf', getNewsINF);

export default newsRouter;
