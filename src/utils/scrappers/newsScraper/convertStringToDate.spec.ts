import { convertStringToDate } from './convertStringToDate';

describe('convertStringToDate', () => {
    it('convertStringToDate date from string DD.MM.YYYY to date', () => {
        const date = '07.03.2023';
        const dateObject = new Date(2023, 2, 7);
        expect(convertStringToDate(date)).toEqual(dateObject);
    });
});
