import { uniqBy } from 'lodash';
import { createUpdateFunction } from './upsertingData.service';
import { NewsModel } from '../../Models/news.model';
import { News } from 'Types/News.type';
import { enumerateData } from './enumerateData.service';

type allNews = {
    INF: News[];
    MFI: News[];
};

export const upsertNews = (allNews: allNews) => {
    const uniqueNewsINF = uniqBy(allNews.INF, 'title');
    const uniqueNewsMFI = uniqBy(allNews.MFI, 'title');
    const updateOrCreateNews = createUpdateFunction(NewsModel);
    const compareValues = ['shortBody', 'body', 'photos', 'category'];
    enumerateData(
        uniqueNewsINF,
        compareValues,
        updateOrCreateNews,
        (record: News) => ({ title: record.title })
    );
    enumerateData(
        uniqueNewsMFI,
        compareValues,
        updateOrCreateNews,
        (record: News) => ({ title: record.title })
    );
};
