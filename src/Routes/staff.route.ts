import {
    getStaff,
    getStaffById,
    searchStaffByName,
    getUnitsInfo,
    searchStaffByUnit,
    getStaffCsv,
} from '../Controllers/staff.controller';
import { Router } from 'express';

const staffRouter = Router();

staffRouter.get('/staff', getStaff);
staffRouter.get('/staff/search', searchStaffByName);
staffRouter.get('/staff/csv', getStaffCsv);
staffRouter.get('/staff/units', getUnitsInfo);
staffRouter.get('/staff/units/search', searchStaffByUnit);
staffRouter.get('/staff/:id', getStaffById);

export default staffRouter;
