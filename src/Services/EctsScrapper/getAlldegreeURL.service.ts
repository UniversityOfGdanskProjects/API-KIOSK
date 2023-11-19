import axios from 'axios';
import cheerio from 'cheerio';
import { DEGREEURL, MAINECTSURL } from './utils/EctsScrappersURLs.const';

export const getAllDegreeURLs = async () => {
    try {
        const { data } = await axios.get(MAINECTSURL + DEGREEURL);
        const $ = cheerio.load(data);

        const allDegreeURLs = $('a.btn-frame')
            .map((_, element) => {
                return {
                    url: element.attribs.href,
                    degree: $(element).text(),
                };
            })
            .get();

        return allDegreeURLs;
    } catch (error) {
        return [];
    }
};
