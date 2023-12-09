import { getAllNews, getNewsDetail } from '../Controllers/news.controller';
import { Router } from 'express';

const newsRouter = Router();

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Get all news
 *     description: Retrieve a list of all news articles.
 *     responses:
 *       200:
 *         description: Successful response
 */
newsRouter.get('/news', getAllNews);

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get news details by ID
 *     description: Retrieve details for a specific news article by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: News article not found
 */
newsRouter.get('/news/:id', getNewsDetail);

export default newsRouter;
