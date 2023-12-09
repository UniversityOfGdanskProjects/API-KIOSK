import {
    newsScraperINF,
    newsScraperMFI,
} from '../Services/newsScraper.service';
import { upsertNews } from '../Services/UpdateRecords/upsertingNews.service';

export const updateNews = async () => {
    try {
        const newsINF = await newsScraperINF();
        const newsMFI = await newsScraperMFI();

        const allNews = {
            INF: newsINF,
            MFI: newsMFI,
        };
        upsertNews(allNews);
    } catch (error) {
        console.log(error);
    }
};
