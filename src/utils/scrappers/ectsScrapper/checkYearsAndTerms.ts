export const checkYearsAndTerms = (subject: string) => {
    if (
        subject.startsWith('I ') ||
        subject.startsWith('II ') ||
        subject.startsWith('III ')
    ) {
        const splited = subject.split(' ');
        return {
            year: splited.at(0),
            term: splited.at(-1),
        };
    }
};
