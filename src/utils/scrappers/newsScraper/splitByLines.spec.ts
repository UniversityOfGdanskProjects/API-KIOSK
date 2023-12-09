import { splitByLines } from './splitByLines';

describe('splitByLines', () => {
    it('returns splitted string', () => {
        const text = 'Podziel\nten tekst\n!';
        expect(splitByLines(text)).toEqual(['Podziel', 'ten tekst', '!']);
    });
    it('returns array even if no new lines found', () => {
        const text = 'test';
        expect(splitByLines(text)).toEqual(['test']);
    });
    it('returns splitted and cleansed string', () => {
        const text = 'Podziel\nten \ttekst\n!';
        expect(splitByLines(text)).toEqual(['Podziel', 'ten tekst', '!']);
    });
});
