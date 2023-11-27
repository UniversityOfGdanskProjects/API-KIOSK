import axios from 'axios';
import cheerio from 'cheerio';
import { News, NewsSource } from '../Types/News.type';
import { reformatDate } from '../utils/scrappers/newsScraper/fixDate';
import { removeSeeMore } from '../utils/scrappers/newsScraper/removeSeeMore';
import { mapNewsCategory } from '../utils/scrappers/newsScraper/returnCategoryEnum';
import { ErrorType } from 'Types/error.type';
import { convertStringToDate } from '../utils/scrappers/newsScraper/convertStringToDate';
import { removeNewLines } from '../utils/scrappers/newsScraper/removeNewLines';
import { removeHTMLAttributes } from '../utils/removeHTMLAttributes';
import _ from 'lodash';

const getBody = async (
    link: string,
    element: string
): Promise<string | null> => {
    const HTMLDataRequest = await axios.get(link);
    const HTMLData = HTMLDataRequest.data;

    const $ = cheerio.load(HTMLData);
    const htmlContent = $(element).html();
    const noAttributes = removeHTMLAttributes(htmlContent);
    return noAttributes;
};

const getPhotos = async (
    site: string,
    leadingPhoto: string,
    element: string
): Promise<string[] | []> => {
    const HTMLDataRequest = await axios.get(site);
    const HTMLData = HTMLDataRequest.data;

    const $ = cheerio.load(HTMLData);
    const photos =
        ($(element)
            .map(function () {
                return leadingPhoto != $(this).attr('href')
                    ? $(this).attr('href')
                    : null;
            })
            .get() as string[]) || [];
    return photos.filter((photo) => photo);
};

export const newsScraperMFI = async (): Promise<News[] | null> => {
    const mfiNewsSites = ['aktualnosci', 'aktualnosci/archiwum-aktualnosci'];
    const newsMFIPromises = (await Promise.allSettled(
        mfiNewsSites.map(async (site) => {
            return await getNewsInCategoriessMFI(site);
        })
    )) as { status: 'fulfilled' | 'rejected'; value: News[] }[];
    const resolvedNewsMFIPromises = newsMFIPromises.filter(
        ({ status }) => status === 'fulfilled'
    );
    const newsMFIResponses = resolvedNewsMFIPromises.map(
        (promise) => promise.value
    );
    //TODO: error handling rejected promises

    return newsMFIResponses.flat();
};

const getNewsInCategoriessMFI = async (
    site: string
): Promise<News[] | ErrorType> => {
    const HTMLDataRequest = await axios.get(
        `https://mfi.ug.edu.pl/wydzial/${site}`
    );
    const HTMLData = HTMLDataRequest.data;

    const $ = cheerio.load(HTMLData);
    const selectedElem = '.item-list > ul > li';
    const newsArray: News[] = await Promise.all(
        $(selectedElem)
            .map(async (parentIndex, parentElem) => {
                const img = $(parentElem)
                    .find('.image-style-news-main-page')
                    .attr('src');
                const href = $(parentElem).find('.news-title a').attr('href');
                const title = $(parentElem).find('.news-title a').text();
                const datetime = $(parentElem).find('.news-datetime').text();
                const body = $(parentElem).find('.news-body').text();
                const longBody = await getBody(
                    'https://mfi.ug.edu.pl/' + href,
                    '.node__content > div:nth-child(2) > div:nth-child(1)'
                );
                const shortDescription = removeSeeMore(body);
                const mainPhoto = 'https://mfi.ug.edu.pl' + img;
                const manyPhotos = await getPhotos(
                    'https://mfi.ug.edu.pl/' + href,
                    mainPhoto,
                    '.colorbox'
                );

                const newsDetail: News = {
                    leadingPhoto: mainPhoto,
                    photos: manyPhotos,
                    link: 'https://mfi.ug.edu.pl' + href,
                    datetime: convertStringToDate(datetime),
                    title: _.trimEnd(title),
                    shortBody: removeNewLines(shortDescription),
                    body: longBody ? longBody : '',
                    source: NewsSource.MFI,
                    category: mapNewsCategory($('h1.title').text()),
                };

                return newsDetail;
            })
            .get()
    );
    return newsArray;
};

export const newsScraperINF = async (): Promise<News[] | null> => {
    const infNewsSites = ['news', 'studinfo'];
    const newsINFPromises = (await Promise.allSettled(
        infNewsSites.map(async (site) => {
            return await getNewsInCategoriesINF(site);
        })
    )) as { status: 'fulfilled' | 'rejected'; value: News[] }[];

    const resolvedNewsINFPromises = newsINFPromises.filter(
        ({ status }) => status === 'fulfilled'
    );
    const newsINFResponses = resolvedNewsINFPromises.map(
        (promise) => promise.value
    );
    //TODO: error handling rejected promises

    return newsINFResponses.flat();
};

const getNewsInCategoriesINF = async (
    site: string
): Promise<News[] | ErrorType> => {
    const HTMLDataRequest = await axios.get(`https://inf.ug.edu.pl/${site}`, {
        headers: {
            'Accept-Encoding': 'application/json',
        },
    });
    const HTMLData = HTMLDataRequest.data;
    const $ = cheerio.load(HTMLData);
    const selectedElem = 'div.newsBox';
    const newsArray: News[] = await Promise.all(
        $(selectedElem)
            .map(async (parentIndex, parentElem) => {
                const img = $(parentElem)
                    .find('.newsThumb')
                    .find('img')
                    .attr('src');
                const href = $(parentElem).find('a').first().attr('href');
                const title = $(parentElem).find('.newsTitle a').text();
                const datetime = $(parentElem).find('.newsDate').text();
                const body = $(parentElem).find('.newsBody').text();
                const longBody = await getBody(
                    'https://inf.ug.edu.pl/' + href,
                    '.artBody'
                );
                const mainPhoto = 'https://inf.ug.edu.pl/' + img;

                const newsDetail: News = {
                    leadingPhoto: mainPhoto,
                    photos: [],
                    link: 'https://inf.ug.edu.pl/' + href,
                    datetime: convertStringToDate(reformatDate(datetime)),
                    title: _.trimEnd(title),
                    shortBody: removeNewLines(body),
                    body: longBody ? longBody : '',
                    source: NewsSource.INF,
                    category: mapNewsCategory($('div.artHeader').text()),
                };
                return newsDetail;
            })
            .get()
    );

    return newsArray;
};
