import { getAllMajors } from '../Controllers/majors.controller';
import { Router } from 'express';

const majorsRouter = Router();

majorsRouter.get('/majors', getAllMajors);

export default majorsRouter;
