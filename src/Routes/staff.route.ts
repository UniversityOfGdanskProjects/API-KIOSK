import { getAllStaff } from '../Controllers/staff.controller';
import { Router } from 'express';

const staffRouter = Router();

staffRouter.get('/staff', getAllStaff);

export default staffRouter;
