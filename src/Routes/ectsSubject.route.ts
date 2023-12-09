import { getAllMajors } from '../Controllers/ects.controller';
import { Router } from 'express';

const ectsSubjectRouter = Router();

/**
 * @swagger
 * /ectsSubjects/majors:
 *   get:
 *     summary: Get all majors
 *     description: Retrieve a list of all majors.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               majors: ['Computer Science', 'Mathematics', 'Physics']
 */
ectsSubjectRouter.get('/ectsSubjects/majors', getAllMajors);

export default ectsSubjectRouter;
