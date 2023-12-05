import { removeHTMLAttributes } from './removeHTMLAttributes';
import cheerio, { CheerioAPI } from 'cheerio';

describe('removeHTMLAttributes', () => {
    it('removes HTML style attribute from string argument', () => {
        const htmlContent = '<h1 style="color:black">Test</h1>';
        const $: CheerioAPI = cheerio.load(htmlContent);

        expect(removeHTMLAttributes($)).toEqual('<h1>Test</h1>');
    });

    it('removes HTML a href from string argument', () => {
        const htmlContent = '<a href="https://test.com">Test</a>';
        const $: CheerioAPI = cheerio.load(htmlContent);

        expect(removeHTMLAttributes($)).toEqual('<a>Test</a>');
    });

    it('removes HTML align attribute from string argument', () => {
        const htmlContent = '<h1 align="center">Test</h1>';
        const $: CheerioAPI = cheerio.load(htmlContent);

        expect(removeHTMLAttributes($)).toEqual('<h1>Test</h1>');
    });

    it('removes all of the above HTML attributes from string argument', () => {
        const htmlContent =
            '<h1 style="color:black" align="center"><a href="https://test.com">Test</a></h1>';
        const $: CheerioAPI = cheerio.load(htmlContent);

        expect(removeHTMLAttributes($)).toEqual('<h1><a>Test</a></h1>');
    });

    it('removes HTML elements inside style attribute from string argument', () => {
        const htmlContent =
            '<h1 style="margin-top:0cm;margin-right:0cm;<br /> ;margin-bottom:0cm">Test</h1>';
        const $: CheerioAPI = cheerio.load(htmlContent);

        expect(removeHTMLAttributes($)).toEqual('<h1>Test</h1>');
    });

    it('removes attributes from nested HTML', () => {
        const htmlContent =
            '<h1 style="color:black"><div class="abc">Test</div></h1>';
        const $: CheerioAPI = cheerio.load(htmlContent);

        expect(removeHTMLAttributes($)).toEqual('<h1><div>Test</div></h1>');
    });
});
