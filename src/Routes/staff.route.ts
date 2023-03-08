import {
    getStaff,
    getStaffById,
    searchStaffByName,
} from '../Controllers/staff.controller';
import { Router } from 'express';

const staffRouter = Router();

staffRouter.get('/staff', getStaff);
staffRouter.get('/staff/search', searchStaffByName);
staffRouter.get('/staff/:id', getStaffById);

export default staffRouter;
