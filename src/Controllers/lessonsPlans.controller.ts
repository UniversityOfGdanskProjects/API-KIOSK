import { Request, RequestHandler, Response } from 'express';
import { LessonsPlanEntry } from '../Types/lessonsPlanEntry.type';
import { ErrorType } from '../Types/error.type';
import { LessonsModel } from '../Models/lessonPlanEntry.model';

export const getAllLessonsPlans: RequestHandler = async (
    req: Request,
    res: Response<LessonsPlanEntry[] | ErrorType>
) => {
    try {
        const lessonsPlans = await LessonsModel.find({}, { __v: 0 });

        return res.status(200).json(lessonsPlans);
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message:
                'Something went wrong when retrieving lessons from database',
        });
    }
};
