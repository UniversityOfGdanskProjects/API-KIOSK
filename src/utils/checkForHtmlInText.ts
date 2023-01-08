export const checkForHtmlInText = (text: string): boolean => {
    // TODO  add <a> tag along with elements with style=
    const htmlElements = ['<li>'];

    return htmlElements.some((element) => text.includes(element));
};
