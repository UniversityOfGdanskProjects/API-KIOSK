import { MajorModel } from '../Models/majors.model';
import { majorsInfoScraper } from '../Services/majorsScraper.service';

export const updateMajors = async (): Promise<void> => {
    try {
        const scrapedMajors = await majorsInfoScraper();

        await MajorModel.deleteMany({});
        await MajorModel.insertMany(scrapedMajors);
    } catch (error) {
        console.log(error);
    }
};
