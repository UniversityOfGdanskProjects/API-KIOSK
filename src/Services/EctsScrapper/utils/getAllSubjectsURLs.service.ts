import axios from 'axios';
import cheerio from 'cheerio';
import { MAINECTSURL } from '../../../utils/scrappers/ectsScrapper/EctsScrappersURLs.const';
import { basicEctsScrap } from '../../../Types/EctsScrapper/basicScrap';
import { startsWith } from 'lodash';

export const getAllSubjectsDegreeURLs = async (
    props: basicEctsScrap[],
    isSpecial: boolean
) => {
    try {
        const allSubjectsDegree = props.map(async (el) => {
            const { data } = isSpecial
                ? await axios.get(el.url)
                : await axios.get(MAINECTSURL + el.url);

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
                            name: el.speciality || el.name,
                            url: MAINECTSURL + URL,
                            degree: el.degree,
                            recruitmentYear: Number(exclusionYear),
                            speciality: major,
                        };
                    }

                    const { data } = await axios.get(MAINECTSURL + URL);
                    const $2 = cheerio.load(data);

                    const allDegreeURLs = $2('a.btn-frame')
                        .map(async (index, element) => {
                            const exclusionYear = parseInt(
                                $2(element).text().split(' ')[1].slice(0, 4)
                            );

                            const finalURL = `${
                                MAINECTSURL + $2(element).attr('href')
                            }`;

                            return {
                                name: name,
                                url: finalURL,
                                degree: el.degree,
                                recruitmentYear: Number(exclusionYear),
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
