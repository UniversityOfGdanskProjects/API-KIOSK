export const parseHTMLInText = (text: string): string => {
    const noEmptyListElements = text.replace('<li>\n</li>', '');
    const noTabs = noEmptyListElements.replace(/\t/gm, '');
    const noNewLines = noTabs.replace(/\n/gm, '');

    return noNewLines;
};
