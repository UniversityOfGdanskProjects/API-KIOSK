import axios from 'axios';
import cheerio from 'cheerio';
import { checkYearsAndTerms } from '../../../utils/scrappers/ectsScrapper/checkYearsAndTerms';
import { isProper } from '../../../utils/scrappers/ectsScrapper/isProper';
import { scrappedEctsSubjectsType } from 'Types/EctsScrapper/scrappedEctsSubjectsType';

export const scrappedEctsSubjects = async (
    finalSubjects: scrappedEctsSubjectsType[]
) => {
    const recruitment = finalSubjects.map(async (major, index) => {
        const { data } = await axios.get(major.url);
        const $1 = cheerio.load(data);

        const tables = $1('table').slice(0, -1);

        const finalData = tables.map((_, table) => {
            const rows = $1(table).children('tbody').find('tr');

            let temporaryTerm = 0;
            let temporaryYear = 0;

            const subjects = rows
                .map((index, row) => {
                    const all = $1(row).find('td').get();
                    const subject = $1(all[0])
                        .text()
                        .replace(/(\n|\t|\u00a0)/gm, '');

                    const lecture = $1(all[1])
                        .text()
                        .replace(/(\n|\t)/gm, '');
                    const recitation = $1(all[2])
                        .text()
                        .replace(/(\n|\t)/gm, '');
                    const labs = $1(all[3])
                        .text()
                        .replace(/(\n|\t)/gm, '');
                    const pass = $1(all[5])
                        .text()
                        .replace(/(\n|\t)/gm, '');
                    const ects = $1(all[6])
                        .text()
                        .replace(/(\n|\t)/gm, '');

                    const checked = checkYearsAndTerms(subject);

                    if (checked) {
                        temporaryTerm = checked.term;
                        temporaryYear = checked.year;
                    }

                    return {
                        subject,
                        lecture,
                        recitation,
                        labs,
                        pass,
                        ects,
                        major: major.name,
                        degree: major.degree,
                        term: temporaryTerm,
                        year: temporaryYear,
                        recruitmentYear: major.recruitmentYear,
                    };
                })
                .get()
                .filter((el) => isProper(el.subject));

            return subjects;
        });
        return finalData.get();
    });
    return (await Promise.all(recruitment)).flat();
};
