export const removeSeeMore = (text: string) => {
    const regex = /[^\wąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*… więcej$/;
    const newText = text.replace(regex, '...');
    return newText;
};
