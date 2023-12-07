import { MajorOutput } from '../Types/major.type';
import { MajorModel } from '../Models/majors.model';
import { Degree } from '../Types/degree.type';
import { Language } from '../Types/language.type';

export const getAllMajorsService = async ({
    language = 'PL',
    degree,
}: {
    language: Language;
    degree?: Degree;
}): Promise<MajorOutput[]> => {
    try {
        const query = degree ? { degree } : {};

        const majors = await MajorModel.find(query, { __v: 0 }).lean();

        const majorsWithName = majors.filter(({ name }) => name[language]);

        return majorsWithName.map(
            (major) =>
                ({
                    ...major,
                    name: major.name[language],
                    content: major.content[language],
                } as MajorOutput)
        );
    } catch (error) {
        throw new Error('Something went wrong');
    }
};

export const getMajorDetailsService = async (
    majorId: string,
    language: Language = 'PL'
): Promise<MajorOutput | null> => {
    try {
        const major = await MajorModel.findOne(
            { _id: majorId },
            { __v: 0 }
        ).lean();

        if (!major) {
            return null;
        }

        if (!major.name[language]) {
            throw new Error('No content in this language');
        }

        return {
            ...major,
            name: major.name[language],
            content: major.content[language],
        } as MajorOutput;
    } catch (error) {
        throw new Error('Something went wrong');
    }
};
