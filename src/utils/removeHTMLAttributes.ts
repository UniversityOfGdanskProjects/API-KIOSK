import { Cheerio, CheerioAPI } from 'cheerio';

const removeAttributesRecursively = ($: CheerioAPI, element: any) => {
    element.children().each(function (this: Cheerio<any>) {
        const tagName = $(this).get(0).name.toLowerCase();
        removeAttributesRecursively($, $(this));
        $(this).replaceWith(`<${tagName}>${$(this).html()}</${tagName}>`);
    });
};

export const removeHTMLAttributes = (cloned$: CheerioAPI) => {
    const root = cloned$.root();
    removeAttributesRecursively(cloned$, root);
    const updatedHTML = root.html()?.replace(/&amp;nbsp;/g, ' ');

    return updatedHTML || '';
};
