import { checkForHtmlInText } from '../utils/checkForHtmlInText';
import axios from 'axios';
import cheerio from 'cheerio';
import { Major, MajorContent } from '../Types/major.type';
import { parseHTMLInText } from '../utils/parseHTMLInText';
import { fixMajorName } from '../utils/majorsScraper/fixMajorName';

export interface ErrorType {
    status: number;
    message: string;
}

const prepareITURLs = async (): Promise<Partial<Major>[] | null[]> => {
    try {
        const url =
            'https://mfi.ug.edu.pl/rekrutacja/studia-i-stopnia/informatyka/tryb-stacjonarny';

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const ITMajorsURLs = $('#block-ug-mfi-theme-menu-glowne > ul a')
            .map((index, element): Partial<Major> | Partial<Major>[] | null => {
                const majorEndpoint = $(element).attr('href');
                const majorName = $(element).text();

                if (majorName === 'Tryb stacjonarny') return null;

                return {
                    name: fixMajorName(majorName),
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
    partialMajor: Partial<Major>
): Promise<Major | null> => {
    try {
        const { name, url } = partialMajor;

        if (!url) return null;

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const majorInfo = $(
            '.taxonomy-term > div > div > div > div > div > div > span > article > div.node__content.clearfix > div'
        )
            .children()
            .map((index, element) => {
                const elementHTML = $(element).html();
                const elementText = $(element).text();

                if (parseHTMLInText(elementText) === '') return;

                if (element.tagName == 'style' || element.name == 'style')
                    return;

                if (checkForHtmlInText(elementHTML || '')) {
                    return {
                        element: element.tagName || element.name,
                        text: parseHTMLInText(elementHTML!),
                    } as MajorContent;
                }

                return {
                    element: element.tagName || element.name,
                    text: elementText,
                } as MajorContent;
            })
            .get();

        return { url, content: majorInfo, name: name || '' };
    } catch (error) {
        return null;
    }
};

export const majorsInfoScraper = async (): Promise<Major[] | ErrorType> => {
    try {
        const { data } = await axios.get(
            'https://mfi.ug.edu.pl/rekrutacja/studia-i-stopnia'
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
                            return await prepareITURLs();
                        }

                        return {
                            name: majorName,
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
                .map((major) => majorScraper(major))
        );

        return majorsFullInfo.filter((major): major is Major => major !== null);
    } catch (error) {
        // @ts-ignore
        if (error?.response?.status === 404) {
            return {
                // @ts-ignore
                status: error.response.status,
                message: 'Sorry! Could not find majors',
            };
        }

        // @ts-ignore
        if (error?.response?.status) {
            return {
                // @ts-ignore
                status: error.response.status,
                message: 'Something went wrong',
            };
        }

        return { status: 500, message: 'Something went wrong' };
    }
};
