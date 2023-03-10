import axios from 'axios';
import cheerio from 'cheerio';
import { News } from '../Types/News.type';
import { reformatDate } from '../utils/newsScraper/fixDate';
import { removeSeeMore } from '../utils/newsScraper/removeSeeMore';
import { splitByLines } from '../utils/newsScraper/splitByLines';

const getBody = async (link: string, element: string): Promise<string> => {
    const HTMLDataRequest = await axios.get(link);
    const HTMLData = HTMLDataRequest.data;

    const $ = cheerio.load(HTMLData);
    const selectedElem = element;
    return $(selectedElem).text();
};

export const newsScraperMFI = async (): Promise<News[] | null> => {
    try {
        const mfiNewsSites = [
            'aktualnosci',
            'aktualnosci/archiwum-aktualnosci',
        ];
        const newsMFIArray: News[][] = await Promise.all(
            mfiNewsSites.map(async (site) => {
                return await getNewsInSectionsMFI(site);
            })
        );

        return newsMFIArray.flat();
    } catch (err) {
        return null;
    }
};

const getNewsInSectionsMFI = async (site: string) => {
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
                let shortDescription = removeSeeMore(body);

                const newsDetail = {
                    photo: 'https://mfi.ug.edu.pl' + img,
                    link: 'https://mfi.ug.edu.pl' + href,
                    datetime: datetime,
                    title: title,
                    shortBody: splitByLines(shortDescription),
                    body: splitByLines(longBody),
                    site: 'MFI',
                    category: $('h1.title').text(),
                };

                return newsDetail;
            })
            .get()
    );
    return newsArray;
};

export const newsScraperINF = async (): Promise<News[] | null> => {
    try {
        const infNewsSites = ['news', 'studinfo'];
        const newsINFArray: News[][] = await Promise.all(
            infNewsSites.map(async (site) => {
                return await getNewsInSectionsINF(site);
            })
        );
        return newsINFArray.flat();
    } catch (err) {
        return null;
    }
};

const getNewsInSectionsINF = async (site: string) => {
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
                const newsDetail = {
                    photo: 'https://inf.ug.edu.pl/' + img,
                    link: 'https://inf.ug.edu.pl/' + href,
                    datetime: reformatDate(datetime),
                    title: title,
                    shortBody: splitByLines(body),
                    body: splitByLines(longBody),
                    site: 'INF',
                    category: $('div.artHeader').text(),
                };
                return newsDetail;
            })
            .get()
    );

    return newsArray;
};
