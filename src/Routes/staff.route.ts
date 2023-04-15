import { getStaff, getStaffById } from '../Controllers/staff.controller';
import { Router } from 'express';

const staffRouter = Router();

staffRouter.get('/staff', getStaff);
staffRouter.get('/staff/:id', getStaffById);

export default staffRouter;
