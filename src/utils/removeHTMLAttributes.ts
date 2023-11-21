export const removeHTMLAttributes = (htmlContent: string | null): string => {
    const noATag = htmlContent!.replace(/<\/?a[^>]*>/gi, '');
    const noStyles = noATag.replace(/style="[^\"]*"/gi, '');
    const noAlignment = noStyles.replace(/(?:align)=[^>]*/gi, '');
    const removeSpace = noAlignment.replace(/\s+(?=>)/g, '');
    return removeSpace;
};
