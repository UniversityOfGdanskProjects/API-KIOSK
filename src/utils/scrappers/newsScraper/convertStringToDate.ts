export const convertStringToDate = (dateStr: string): Date => {
    const dateParts = dateStr.split('.');
    const dateObject = new Date(
        parseInt(dateParts[2]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[0])
    );
    return dateObject;
};
