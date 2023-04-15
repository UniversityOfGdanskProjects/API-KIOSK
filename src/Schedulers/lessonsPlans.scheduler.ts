import { lessonsPlansScrapper } from '../Services/lessonsPlansScrapper.service';
import { LessonsModel } from '../Models/lessonPlanEntry.model';

export const updateLessons = async (): Promise<void> => {
    try {
        const scrappedLessons = await lessonsPlansScrapper();

        if ('status' in scrappedLessons) {
            console.log(scrappedLessons);
            return;
        }

        const savedLessons = await LessonsModel.find();

        if (JSON.stringify(savedLessons) !== JSON.stringify(scrappedLessons)) {
            LessonsModel.deleteMany();
            LessonsModel.insertMany(scrappedLessons);

            console.log('Lessons updated');

            return;
        }
    } catch (error) {
        console.log(error);

        return;
    }
};
