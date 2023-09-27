import axios from 'axios';
import cheerio from 'cheerio';
import { mainEctsUrl } from './getAlldegreeURL.service';
import { ectsSubject } from '../../Types/ectsSubject';

export const getAllSubjectsDegreeURLs = async (
    props: Pick<ectsSubject, 'degree' | 'url'>[]
) => {
    try {
        const allSubjectsDegree = props.map(async (el, i) => {
            const { data } = await axios.get(mainEctsUrl + el.url);
            const $1 = cheerio.load(data);
            const subjectsNamesURL = $1('a.btn-frame')
                .map(async (index, element) => {
                    const URL = $1(element).attr('href');
                    const name = $1(element).text();
                    const { data } = await axios.get(mainEctsUrl + URL);
                    const $2 = cheerio.load(data);

                    const allDegreeURLs = $2(
                        'a.btn-frame:contains("nabór 2022/2023")'
                    ).attr('href');
                    const finalURL = allDegreeURLs
                        ? `${mainEctsUrl + allDegreeURLs}`
                        : (URL as string);

                    return {
                        name: name,
                        url: finalURL,
                        degree: el.degree,
                    };
                })
                .get();

            return await Promise.all(subjectsNamesURL);
        });

        return (await Promise.all(allSubjectsDegree)).flat();
    } catch (error) {
        return [];
    }
};
