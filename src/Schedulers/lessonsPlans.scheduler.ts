import {
    getAllLessons,
    updateAllLessons,
} from '../Services/lessonsPlan.service';
import { lessonPlansScrapper } from '../Services/lessonsPlansScrapper.service';

export const updateLessons = async () => {
    try {
        const scrappedLessons = await lessonPlansScrapper();

        if ('status' in scrappedLessons) {
            console.log(scrappedLessons);
        } else {
            const savedLessons = await getAllLessons();

            if (
                JSON.stringify(savedLessons) !== JSON.stringify(scrappedLessons)
            ) {
                const ifUpdated = await updateAllLessons(scrappedLessons);

                ifUpdated
                    ? console.log('Lessons updated')
                    : console.log("Couldn't update lessons");
            }
        }
    } catch (error) {
        console.log(error);
    }
};
