export const removeSeeMore = (text: string) => {
    const regex = /... więcej$/;
    const newText = text.replace(regex, '...');
    return newText;
};
