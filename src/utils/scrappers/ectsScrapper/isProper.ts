export const isProper = (subject: string) => {
    return (
        !subject.startsWith('Razem') &&
        subject !== '' &&
        !subject.startsWith('I ') &&
        !subject.startsWith('II ') &&
        !subject.startsWith('III ')
    );
};
