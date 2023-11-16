export const removeSeeMore = (text: string) => {
    const regex = /[\W]*… więcej$/;
    const newText = text.replace(regex, '...');
    return newText;
};
