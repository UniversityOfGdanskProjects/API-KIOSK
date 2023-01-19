import { getAllLessonsPlans } from '../Controllers/lessonsPlans.controller';
import { Router } from 'express';

const lessonsPlansRouter = Router();

lessonsPlansRouter.get('/lessonsPlans', getAllLessonsPlans);

export default lessonsPlansRouter;
