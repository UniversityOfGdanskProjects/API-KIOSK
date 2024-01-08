export const removeNewLines = (text: String) => {
    const newText = text.replace(/\n/g, ' ');
    return newText.replace(/\s{2,}/g, ' ');
};
