import { NewsModel } from '../Models/news.model';
import {
    newsScraperINF,
    newsScraperMFI,
} from '../Services/newsScraper.service';

export const updateNews = async () => {
    try {
        const newsINF = await newsScraperINF();
        const newsMFI = await newsScraperMFI();

        await NewsModel.deleteMany({});
        await NewsModel.insertMany(newsINF);
        await NewsModel.insertMany(newsMFI);
    } catch (error) {
        console.log(error);
    }
};
