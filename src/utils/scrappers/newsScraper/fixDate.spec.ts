import { reformatDate } from './fixDate';

describe('reformatDate', () => {
    it('reformat date from YYYY-MM-DD to DD.MM.YYYY', () => {
        const date = '2023-03-07';
        expect(reformatDate(date)).toEqual('07.03.2023');
    });
});
