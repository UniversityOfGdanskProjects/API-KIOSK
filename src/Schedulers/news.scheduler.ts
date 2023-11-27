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
        if (newsINF && newsINF.length > 0) {
            newsINF.forEach(async (news) => {
                await NewsModel.findOneAndUpdate({ title: news.title }, news, {
                    upsert: true,
                    new: true,
                });
            });
        }

        if (newsMFI && newsMFI.length > 0) {
            newsMFI.forEach(async (news) => {
                await NewsModel.findOneAndUpdate({ title: news.title }, news, {
                    upsert: true,
                    new: true,
                });
            });
        }
    } catch (error) {
        console.log(error);
    }
};
