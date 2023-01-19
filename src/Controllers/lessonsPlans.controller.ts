import { lessonPlansScrapper } from '../Services/lessonsPlansScrapper.service';
import { Request, RequestHandler, Response } from 'express';
import { LessonsPlanEntry } from 'Types/lessonsPlanEntry.type';

export const getAllLessonsPlans: RequestHandler = async (
    req: Request,
    res: Response<LessonsPlanEntry[] | string>
) => {
    const lessonsPlans = await lessonPlansScrapper();

    if ('status' in lessonsPlans) {
        return res.status(lessonsPlans.status).send(lessonsPlans.message);
    }

    return res.send(lessonsPlans);
};
