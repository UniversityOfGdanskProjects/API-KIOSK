import { getAllDegreeURLs } from './utils/getAlldegreeURL.service';
import { getAllSubjectsDegreeURLs } from './utils/getAllSubjectsURLs.service';
import { scrappedEctsSubjects } from './utils/scrappedEctsSubjects.service';
import { returnScraperError } from '../../utils/errorScraper';
import { scrappedEctsSubjectsType } from '../../Types/EctsScrapper/scrappedEctsSubjectsType';
import { omit, map, groupBy, forOwn, isEmpty, mapValues } from 'lodash';
import { EctsSubjectType } from 'Types/EctsScrapper/ectsSubject';
import { ErrorType } from 'Types/error.type';
import isTheWorstCase from '../../utils/scrappers/ectsScrapper/isTheWorstCase';
import { badSubjects } from '../../utils/scrappers/ectsScrapper/EctsScrappersURLs.const';

export const ectsScrapper = async (): Promise<
    EctsSubjectType[] | ErrorType
> => {
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
                .filter((el) => isNaN(el.recruitmentYear));

            const getSpecialCases = (
                await getAllSubjectsDegreeURLs(specialCases, true)
            ).flat() as scrappedEctsSubjectsType[];

            const ogolna = getSpecialCases.filter(
                (el) => el.speciality && isTheWorstCase(el.speciality)
            );

            const theWorstCase = await getAllSubjectsDegreeURLs(ogolna, true);

            const withSpecialCases = allSubjectsURLs
                .concat(getSpecialCases, theWorstCase)
                .flat()
                .filter(
                    (el) => el.recruitmentYear < 2023
                ) as scrappedEctsSubjectsType[];

            const ectsSubjects = await scrappedEctsSubjects(withSpecialCases);

            const groupedByRecruitmentYear = groupBy(ectsSubjects, (obj) =>
                JSON.stringify(omit(obj, 'recruitmentYear'))
            );

            const groupedArray = map(groupedByRecruitmentYear, (obj) => {
                const recruitmentYearValues = map(obj, 'recruitmentYear');
                return {
                    ...omit(obj[0], 'recruitmentYear'),
                    recruitmentYear: recruitmentYearValues,
                };
            }).filter(
                (el) =>
                    !badSubjects.some((word) =>
                        el.subject.trim().startsWith(word)
                    )
            );

            return groupedArray;
        } catch (error: any) {
            return returnScraperError(error);
        }
    }
};
