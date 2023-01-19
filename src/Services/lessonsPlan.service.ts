import { LessonsModel } from '../Models/lessonPlanEntry.model';
import { LessonsPlanEntry } from '../Types/lessonsPlanEntry.type';

export const getAllLessons = async (): Promise<LessonsPlanEntry[]> => {
    try {
        const lessons = await LessonsModel.find();

        return lessons;
    } catch (error) {
        return [];
    }
};

export const updateAllLessons = async (
    newLessons: LessonsPlanEntry[]
): Promise<boolean> => {
    try {
        await LessonsModel.deleteMany();
        await LessonsModel.insertMany(newLessons);

        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
};
