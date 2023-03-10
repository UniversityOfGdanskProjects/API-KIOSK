import { parseHTMLInText } from '../parseHTMLInText';
export const splitByLines = (text: string): string[] => {
    let newText = text.trim().split(/\r?\n+/);
    let parsedText = newText.map((line) => {
        return parseHTMLInText(line);
    });
    return parsedText;
};
