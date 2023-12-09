import {
    getAllLecturesForMajorYear,
    getAllLessonsForMajorYear,
    getAllLessonsForMajorYearGroup,
} from '../Controllers/lessonsPlans.controller';
import { Router } from 'express';

const lessonsPlansRouter = Router();

/**
 * @swagger
 * /lessonsPlans/{major}/{year}:
 *   get:
 *     summary: Get all lessons for a major and year
 *     parameters:
 *       - in: path
 *         name: major
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
lessonsPlansRouter.get('/lessonsPlans/:major/:year', getAllLessonsForMajorYear);

/**
 * @swagger
 * /lessonsPlans/{major}/{year}/lectures:
 *   get:
 *     summary: Get all lectures for a major and year
 *     parameters:
 *       - in: path
 *         name: major
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
lessonsPlansRouter.get(
    '/lessonsPlans/:major/:year/lectures',
    getAllLecturesForMajorYear
);

/**
 * @swagger
 * /lessonsPlans/{major}/{year}/{group}:
 *   get:
 *     summary: Get all lessons for a major, year, and group
 *     parameters:
 *       - in: path
 *         name: major
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: group
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
lessonsPlansRouter.get(
    '/lessonsPlans/:major/:year/:group',
    getAllLessonsForMajorYearGroup
);

export default lessonsPlansRouter;
