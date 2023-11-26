import { parseHTMLInText } from '../parseHTMLInText';
export const splitByLines = (text: string): string[] => {
    const newText = text.trim().split(/\r?\n+/);
    const parsedText = newText.map((line) => parseHTMLInText(line));
    return parsedText;
};
