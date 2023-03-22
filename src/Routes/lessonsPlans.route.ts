import {
    getAllLecturesForMajorYear,
    getAllLessonsForMajorYear,
    getAllLessonsForMajorYearGroup,
} from '../Controllers/lessonsPlans.controller';
import { Router } from 'express';

const lessonsPlansRouter = Router();

lessonsPlansRouter.get('/lessonsPlans/:major/:year', getAllLessonsForMajorYear);

lessonsPlansRouter.get(
    '/lessonsPlans/:major/:year/lectures',
    getAllLecturesForMajorYear
);

lessonsPlansRouter.get(
    '/lessonsPlans/:major/:year/:group',
    getAllLessonsForMajorYearGroup
);

export default lessonsPlansRouter;
