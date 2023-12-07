import axios from 'axios';
import cheerio from 'cheerio';
import { Major } from '../Types/major.type';
import { fixMajorName } from '../utils/scrappers/majorsScraper/fixMajorName';
import { returnScraperError } from '../utils/errorScraper';
import { removeNewLines } from '../utils/removeNewLines';
import { Degree } from '../Types/degree.type';

export interface ErrorType {
    status: number;
    message: string;
}

const prepareITURLs = async (
    degree: Degree
): Promise<Partial<Major>[] | null[]> => {
    try {
        const degreeURL =
            degree === Degree.BACHELOR
                ? 'studia-i-stopnia'
                : 'studia-ii-stopnia';

        const url = `https://mfi.ug.edu.pl/rekrutacja/${degreeURL}/informatyka/tryb-stacjonarny`;

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const ITMajorsURLs = $('#block-ug-mfi-theme-menu-glowne > ul a')
            .map((index, element): Partial<Major> | Partial<Major>[] | null => {
                const majorEndpoint = $(element).attr('href');
                const majorName = $(element).text();

                if (majorName === 'Tryb stacjonarny') return null;

                return {
                    name: { PL: fixMajorName(majorName) },
                    url: 'https://mfi.ug.edu.pl' + majorEndpoint,
                };
            })
            .get();

        return ITMajorsURLs;
    } catch (error) {
        return [null];
    }
};

const majorScraper = async (
    partialMajor: Partial<Major>,
    degree: Degree
): Promise<Major | null> => {
    try {
        if (!partialMajor.url) return null;

        const { data } = await axios.get(partialMajor.url);
        const $ = cheerio.load(data);

        const majorBody = $(
            '.taxonomy-term > div > div > div > div > div > div > span > article > div.node__content.clearfix > div'
        ).html();

        return {
            url: partialMajor.url,
            content: {
                PL: majorBody ? removeNewLines(majorBody) : null,
                EN: null,
            },
            name: { PL: partialMajor.name!.PL || '', EN: '' },
            degree,
        };
    } catch (error) {
        return null;
    }
};

const majorsScrapperByDegree = async (degree: Degree): Promise<Major[]> => {
    const degreeURL =
        degree === Degree.BACHELOR ? 'studia-i-stopnia' : 'studia-ii-stopnia';

    const { data } = await axios.get(
        `https://mfi.ug.edu.pl/rekrutacja/${degreeURL}`
    );

    const $ = cheerio.load(data);

    const majorsNavElementPath =
        '#block-ug-mfi-theme-menu-glowne > ul > li.nav-item.menu-item--expanded.menu-item--active-trail > ul > li';

    const majors = await Promise.all(
        $(majorsNavElementPath)
            .map(
                async (
                    index,
                    element
                ): Promise<
                    | Partial<Major>
                    | Partial<Major>[]
                    | (Partial<Major> | null)[]
                > => {
                    const majorEndpoint = $(element).find('a').attr('href');
                    const majorName = $(element).find('a').text();

                    if (majorName === 'Informatyka') {
                        return await prepareITURLs(degree);
                    }

                    return {
                        name: { PL: majorName },
                        url: 'https://mfi.ug.edu.pl' + majorEndpoint,
                    };
                }
            )
            .get()
    );

    const majorsFullInfo = await Promise.all(
        majors
            .flat()
            .filter((major): major is Major => major !== null)
            .map((major) => majorScraper(major, degree))
    );

    return majorsFullInfo.filter((major): major is Major => major !== null);
};

export const majorsInfoScraper = async (): Promise<Major[] | ErrorType> => {
    try {
        const majorsBachelor = majorsScrapperByDegree(Degree.BACHELOR);
        const majorsMaster = majorsScrapperByDegree(Degree.MASTER);

        return Promise.all([majorsBachelor, majorsMaster]).then((majors) =>
            majors.flat()
        );
    } catch (error) {
        return returnScraperError(error);
    }
};
