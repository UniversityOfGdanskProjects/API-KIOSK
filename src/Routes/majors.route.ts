import { getAllMajors, getMajor } from '../Controllers/majors.controller';
import { Router } from 'express';

const majorsRouter = Router();

majorsRouter.get('/majors', getAllMajors);
majorsRouter.get('/major/:id', getMajor);

export default majorsRouter;
