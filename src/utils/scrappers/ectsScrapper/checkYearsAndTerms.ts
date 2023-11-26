import { getYear } from './getYear';

export const checkYearsAndTerms = (subject: string) => {
    if (
        subject.startsWith('I ') ||
        subject.startsWith('II ') ||
        subject.startsWith('III ')
    ) {
        const splited = subject.trim().split(' ');

        return {
            year: Number(getYear(splited.at(0) as string)),
            term: Number(splited.at(-1)),
        };
    }
};
