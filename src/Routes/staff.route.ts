import { getStaff, getStaffById } from '../Controllers/staff.controller';
import { Router } from 'express';

const staffRouter = Router();

/**
 * @swagger
 * /staff:
 *   get:
 *     summary: Get all staff members
 *     description: Retrieve a list of all staff members.
 *     responses:
 *       200:
 *         description: Successful response
 */
staffRouter.get('/staff', getStaff);

/**
 * @swagger
 * /staff/{id}:
 *   get:
 *     summary: Get staff details by ID
 *     description: Retrieve details for a specific staff member by ID.
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
 *         description: Staff member not found
 */
staffRouter.get('/staff/:id', getStaffById);

export default staffRouter;
