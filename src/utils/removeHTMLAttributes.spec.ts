import { removeHTMLAttributes } from './removeHTMLAttributes';

describe('removeHTMLAttributes', () => {
    it('removes HTML style attribute from string argument', () => {
        const text = '<h1 style="color:black">Test</h1>';

        expect(removeHTMLAttributes(text)).toEqual('<h1>Test</h1>');
    });

    it('removes HTML a href from string argument', () => {
        const text = '<a href="https://test.com">Test</a>';

        expect(removeHTMLAttributes(text)).toEqual('Test');
    });

    it('removes HTML align attribute from string argument', () => {
        const text = '<h1 align="center">Test</h1>';

        expect(removeHTMLAttributes(text)).toEqual('<h1>Test</h1>');
    });

    it('removes all of the above HTML attributes from string argument', () => {
        const text =
            '<h1 style="color:black" align="center"><a href="https://test.com">Test</a></h1>';

        expect(removeHTMLAttributes(text)).toEqual('<h1>Test</h1>');
    });

    it('removes HTML elements inside style attribute from string argument', () => {
        const text =
            '<h1 style="margin-top:0cm;margin-right:0cm;<br /> ;margin-bottom:0cm">Test</h1>';

        expect(removeHTMLAttributes(text)).toEqual('<h1>Test</h1>');
    });
});
