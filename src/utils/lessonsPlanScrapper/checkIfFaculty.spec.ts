import { checkIfFaculty } from './checkIfFaculty';

describe('checkIfFaculty', () => {
    it.only('URL of faculty', () => {
        const url = '?zajecia=Fali';
        const result = checkIfFaculty(url);

        expect(result).toBeTruthy();
    });

    it.only('URL of seminar', () => {
        const url = '?zajecia=Selm';
        const result = checkIfFaculty(url);

        expect(result).toBeFalsy();
    });
});
