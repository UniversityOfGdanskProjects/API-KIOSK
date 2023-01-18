import { lessonPlansScrapper } from '../Services/lessonsPlansScrapper.service';
import { MajorLessonsPlanObject } from '../Types/majorLessonsPlanObject.type';
import { Request, RequestHandler, Response } from 'express';

export const getAllLessonsPlans: RequestHandler = async (
    req: Request,
    res: Response<MajorLessonsPlanObject[]>
) => {
    try {
        const lessonsPlans = await lessonPlansScrapper();
        return res.send(lessonsPlans);
    } catch {
        return res.sendStatus(500);
    }
};
