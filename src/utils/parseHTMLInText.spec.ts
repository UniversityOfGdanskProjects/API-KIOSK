import { parseHTMLInText } from './parseHTMLInText';

describe('parseHTMLInText', () => {
    it('remove unnecessary HTML from string argument', () => {
        const text = '\tOferowane specjalności:';

        expect(parseHTMLInText(text)).toEqual('Oferowane specjalności:');
    });
});
