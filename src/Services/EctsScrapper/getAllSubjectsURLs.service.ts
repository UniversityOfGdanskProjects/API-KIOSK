import axios from 'axios';
import cheerio from 'cheerio';
import { mainEctsUrl } from './getAlldegreeURL.service';
import { ectsSubject } from '../../Types/ectsSubject';
import { startsWith } from 'lodash';
import { scrappedEctsSubjectsType } from './utils/scrappedType';

export const getAllSubjectsDegreeURLs = async (
    props: Pick<ectsSubject, 'degree' | 'url'>[],
    isSpecial: boolean
) => {
    try {
        const allSubjectsDegree = props.map(async (el, i) => {
            const { data } = isSpecial
                ? await axios.get(el.url)
                : await axios.get(mainEctsUrl + el.url);

            const $1 = cheerio.load(data);
            const major = $1('.title').text();

            const subjectsNamesURL = $1('a.btn-frame')
                .map(async (index, element) => {
                    const URL = $1(element).attr('href');
                    const name = $1(element).text();

                    if (isSpecial) {
                        const exclusionYear = parseInt(
                            name.split(' ')[1].slice(0, 4)
                        );
                        return {
                            name: major,
                            url: mainEctsUrl + URL,
                            degree: el.degree,
                            year: `${exclusionYear}/${exclusionYear + 1}`,
                        };
                    }

                    const { data } = await axios.get(mainEctsUrl + URL);
                    const $2 = cheerio.load(data);

                    const allDegreeURLs = $2('a.btn-frame')
                        .map(async (index, element) => {
                            const exclusionYear = parseInt(
                                $2(element).text().split(' ')[1].slice(0, 4)
                            );

                            const finalURL = `${
                                mainEctsUrl + $2(element).attr('href')
                            }`;

                            return {
                                name: name,
                                url: finalURL,
                                degree: el.degree,
                                year: `${exclusionYear}/${exclusionYear + 1}`,
                            };
                        })
                        .get();

                    return await Promise.all(allDegreeURLs);
                })
                .get();

            return (await Promise.all(subjectsNamesURL)).flat();
        });

        return await Promise.all(allSubjectsDegree);
    } catch (error) {
        return [];
    }
};
