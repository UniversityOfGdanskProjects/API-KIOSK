export const removeSeeMore = (text: string) => {
    let regex = /... więcej$/;
    let newText = text.replace(regex, '...');
    return newText;
};
