import { getAllMajors, getMajor } from '../Controllers/majors.controller';
import { Router } from 'express';

const majorsRouter = Router();

/**
 * @swagger
 * /majors:
 *   get:
 *     summary: Get all majors
 *     description: Retrieve a list of all majors.
 *     responses:
 *       200:
 *         description: Successful response
 */
majorsRouter.get('/majors', getAllMajors);

/**
 * @swagger
 * /majors/{id}:
 *   get:
 *     summary: Get a major by ID
 *     description: Retrieve details for a specific major by ID.
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
 *         description: Major not found
 */
majorsRouter.get('/majors/:id', getMajor);

export default majorsRouter;
