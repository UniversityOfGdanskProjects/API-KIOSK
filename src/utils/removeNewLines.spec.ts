import { removeNewLines } from './removeNewLines';

describe('removeNewLines', () => {
    it('removes new line', () => {
        const text = 'Remove\nnewLine';
        expect(removeNewLines(text)).toEqual('Remove newLine');
    });
    it('removes new line and corrects spacing', () => {
        const text = 'Remove \n newLine';
        expect(removeNewLines(text)).toEqual('Remove newLine');
    });
});
