import axios from 'axios';
import cheerio from 'cheerio';
import { Major, MajorContent } from 'Types/major.type';

const majorScraper = async (partialMajor: Partial<Major>): Promise<Major> => {
    const { name, url } = partialMajor;
    const { data } = await axios.get(url || '');

    const $ = cheerio.load(data);

    const majorInfo = $(
        '#taxonomy-term-43528 > div > div > div > div > div > div > span > article > div.node__content.clearfix > div'
    )
        .children()
        .map(
            (index, element) =>
                ({
                    element: element.tagName || element.name,
                    text: $(element).text(),
                } as MajorContent)
        )
        .get()
        .flat();

    return { content: majorInfo, name: name || '', url: url || '' };
};

export const majorsInfoScraper = async (): Promise<Major[]> => {
    const { data } = await axios.get(
        'https://mfi.ug.edu.pl/rekrutacja/studia-i-stopnia'
    );

    const $ = cheerio.load(data);

    const majorsNavElementPath =
        '#block-ug-mfi-theme-menu-glowne > ul > li.nav-item.menu-item--expanded.menu-item--active-trail > ul > li';

    const majors = $(majorsNavElementPath)
        .map((index, element): Partial<Major> => {
            const majorEndpoint = $(element).find('a').attr('href');
            const majorName = $(element).find('a').text();

            return {
                name: majorName,
                url: 'https://mfi.ug.edu.pl' + majorEndpoint,
            };
        })
        .get();

    const majorsFullInfo = await Promise.all(
        majors.map((major) => majorScraper(major))
    );

    console.log(majorsFullInfo);

    return majorsFullInfo;
};
