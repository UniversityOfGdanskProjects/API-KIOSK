export const reformatDate = (dateStr: string): string => {
    const dateArray = dateStr.split('-');
    return dateArray[2] + '.' + dateArray[1] + '.' + dateArray[0];
};
