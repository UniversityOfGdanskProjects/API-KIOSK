import { getAllDegreeURLs } from './getAlldegreeURL.service';
import { getAllSubjectsDegreeURLs } from './getAllSubjectsURLs.service';
import { scrappedEctsSubjects } from './utils/scrappedEctsSubjects';
import checkSubjects from '../../utils/scrappers/ectsScrapper/checkSubjects';
import { returnScraperError } from '../../utils/errorScraper';
import { scrappedEctsSubjectsType } from './utils/scrappedType';
import _, { isEmpty } from 'lodash';

export const getAllUrls = async () => {
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
                .filter((el) => checkSubjects(el.name))
                .map((el) => ({ url: el.url, degree: el.degree }));

            const theWorstCase = await getAllSubjectsDegreeURLs(ogolna, true);

            const withSpecialCases = allSubjectsURLs
                .concat(getSpecialCases)
                .concat(theWorstCase)
                .flat()
                .filter((el) => el.recruitmentYear < 2023);

            const ectsSubjects = await scrappedEctsSubjects(withSpecialCases);

            const groupedByRecruitmentYear = _.groupBy(ectsSubjects, (obj) =>
                JSON.stringify(_.omit(obj, 'recruitmentYear'))
            );

            const resultArray = _.map(groupedByRecruitmentYear, (group) => {
                const recruitmentYearValues = _.map(group, 'recruitmentYear');
                return {
                    ..._.omit(group[0], 'recruitmentYear'),
                    recruitmentYear: recruitmentYearValues,
                };
            });

            console.log(resultArray);

            return resultArray;
        } catch (error: any) {
            return returnScraperError(error);
        }
        // }
    }
};
