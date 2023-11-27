import {
    newsScraperINF,
    newsScraperMFI,
} from '../Services/newsScraper.service';
import _ from 'lodash';
import { createUpdateFunction } from '../utils/updatingData';
import { NewsModel } from '../Models/news.model';

export const updateNews = async () => {
    try {
        const newsINF = await newsScraperINF();
        const newsMFI = await newsScraperMFI();

        const uniqueNewsINF = _.uniqBy(newsINF, 'title');
        const uniqueNewsMFI = _.uniqBy(newsMFI, 'title');
        const updateOrCreateNews = createUpdateFunction(NewsModel);
        const compareValues = ['shortBody', 'body', 'photos', 'category'];

        if (uniqueNewsINF && uniqueNewsINF.length > 0) {
            uniqueNewsINF.forEach(async (news) => {
                await updateOrCreateNews(
                    { title: news.title },
                    news,
                    compareValues
                );
            });
        }
        if (uniqueNewsMFI && uniqueNewsMFI.length > 0) {
            uniqueNewsMFI.forEach(async (news) => {
                await updateOrCreateNews(
                    { title: news.title },
                    news,
                    compareValues
                );
            });
        }
    } catch (error) {
        console.log(error);
    }
};
