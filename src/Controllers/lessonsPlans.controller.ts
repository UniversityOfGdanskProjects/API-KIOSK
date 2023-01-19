import { Request, RequestHandler, Response } from 'express';
import { LessonsPlanEntry } from '../Types/lessonsPlanEntry.type';
import { getAllLessons } from '../Services/lessonsPlan.service';

export const getAllLessonsPlans: RequestHandler = async (
    req: Request,
    res: Response<LessonsPlanEntry[] | string>
) => {
    try {
        const lessonsPlans = await getAllLessons();

        return res.status(200).json(lessonsPlans);
    } catch (error) {
        return res
            .status(500)
            .json({
                status: 500,
                message:
                    'Something went wrong when retrieving lessons from database',
            });
    }
};
