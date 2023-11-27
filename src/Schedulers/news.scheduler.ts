import { News } from './../Types/News.type';
import { NewsModel } from '../Models/news.model';
import {
    newsScraperINF,
    newsScraperMFI,
} from '../Services/newsScraper.service';
import _ from 'lodash';

const isDifferent = (ObjectA: News, ObjectB: News) => {
    const compareValues = ['shortBody', 'body', 'photos', 'category'];
    const cleanObjectA = _.pick(ObjectA, compareValues);
    const cleanObjectB = _.pick(ObjectB, compareValues);
    return !_.isEqual(cleanObjectA, cleanObjectB);
};

const updateOrCreateNews = async (news: News) => {
    const filter = { title: news.title };

    const existingNews = await NewsModel.findOne(filter);

    if (existingNews) {
        const isAnyFieldDifferent = isDifferent(existingNews, news);

        if (isAnyFieldDifferent) {
            await NewsModel.findOneAndUpdate(
                filter,
                {
                    $set: {
                        leadingPhoto: news.leadingPhoto,
                        photos: news.photos,
                        link: news.link,
                        datetime: news.datetime,
                        shortBody: news.shortBody,
                        body: news.body,
                        source: news.source,
                        category: news.category,
                    },
                },
                { new: true }
            );
        }
    } else {
        const newNews = new NewsModel(news);
        await newNews.save();
    }
};

export const updateNews = async () => {
    try {
        const newsINF = await newsScraperINF();
        const newsMFI = await newsScraperMFI();

        const uniqueNewsINF = _.uniqBy(newsINF, 'title');
        const uniqueNewsMFI = _.uniqBy(newsMFI, 'title');

        if (uniqueNewsINF && uniqueNewsINF.length > 0) {
            uniqueNewsINF.forEach(async (news) => {
                await updateOrCreateNews(news);
            });
        }
        if (uniqueNewsMFI && uniqueNewsMFI.length > 0) {
            uniqueNewsMFI.forEach(async (news) => {
                await updateOrCreateNews(news);
            });
        }
    } catch (error) {
        console.log(error);
    }
};
