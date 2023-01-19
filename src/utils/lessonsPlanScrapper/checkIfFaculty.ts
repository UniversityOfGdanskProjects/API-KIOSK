export const checkIfFaculty = (url: string): boolean => {
    const splitted = url.split('=');
    return splitted[1].charAt(0) === 'F';
};
