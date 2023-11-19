import { getAllDegreeURLs } from './utils/getAlldegreeURL.service';
import { getAllSubjectsDegreeURLs } from './utils/getAllSubjectsURLs.service';
import { scrappedEctsSubjects } from './utils/scrappedEctsSubjects.service';
import { returnScraperError } from '../../utils/errorScraper';
import { scrappedEctsSubjectsType } from '../../Types/EctsScrapper/scrappedEctsSubjectsType';
import { omit, map, groupBy } from 'lodash';
import { ectsSubject } from 'Types/EctsScrapper/ectsSubject';
import { ErrorType } from 'Types/error.type';
import isTheWorstCase from '../../utils/scrappers/ectsScrapper/isTheWorstCase';

export const ectsScrapper = async (): Promise<ectsSubject[] | ErrorType> => {
    {
        try {
            const allDegreeURLs = await getAllDegreeURLs();
            const allSubjectsURLs = await getAllSubjectsDegreeURLs(
                allDegreeURLs,
                false
            );

            const specialCases = (
                allSubjectsURLs as scrappedEctsSubjectsType[][]
            )
                .flat()
                .filter((el) => isNaN(el.recruitmentYear))
                .map((el) => ({ url: el.url, degree: el.degree }));

            const getSpecialCases = (
                await getAllSubjectsDegreeURLs(specialCases, true)
            ).flat();

            const ogolna = getSpecialCases
                .filter((el) => isTheWorstCase(el.name))
                .map((el) => ({ url: el.url, degree: el.degree }));

            const theWorstCase = await getAllSubjectsDegreeURLs(ogolna, true);

            const withSpecialCases = allSubjectsURLs
                .concat(getSpecialCases)
                .concat(theWorstCase)
                .flat()
                .filter((el) => el.recruitmentYear < 2023);

            const ectsSubjects = await scrappedEctsSubjects(withSpecialCases);

            const groupedByRecruitmentYear = groupBy(ectsSubjects, (obj) =>
                JSON.stringify(omit(obj, 'recruitmentYear'))
            );

            const resultArray = map(groupedByRecruitmentYear, (group) => {
                const recruitmentYearValues = map(group, 'recruitmentYear');
                return {
                    ...omit(group[0], 'recruitmentYear'),
                    recruitmentYear: recruitmentYearValues,
                };
            });

            return resultArray;
        } catch (error: any) {
            return returnScraperError(error);
        }
    }
};
