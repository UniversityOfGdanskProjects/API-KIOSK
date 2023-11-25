export const removeHTMLAttributes = (htmlContent: string | null): string => {
    const noATag = htmlContent!.replace(/<\/?a[^>]*>/gi, '');
    const noStyles = noATag.replace(/<\s*(\w+).*?(?<!\/)>/g, '<$1>');
    return noStyles;
};
