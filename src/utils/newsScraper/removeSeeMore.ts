export const removeSeeMore = (text: string) => {
    const regex = /([,|\s|-])*… więcej$/;
    const newText = text.replace(regex, '...');
    return newText;
};
