export const checkForHtmlInText = (text: string): boolean => {
    const htmlElements = ['<a>', '<li>'];

    return htmlElements.some((element) => text.includes(element));
};
