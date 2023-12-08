import { getAllMajors } from '../Controllers/ects.controller';
import { Router } from 'express';

const ectsSubjectRouter = Router();

ectsSubjectRouter.get('/ectsSubjects/majors', getAllMajors);

export default ectsSubjectRouter;
