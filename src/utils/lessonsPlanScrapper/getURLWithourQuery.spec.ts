import { getURLWithoutQuery } from './getURLWithoutQuery';

describe('getURLWithourQuery', () => {
    it.only('returned URL without query', () => {
        const url = '?zajecia=Selm&format=list';
        const result = getURLWithoutQuery(url);

        expect(result).toBe('?zajecia=Selm');
    });
});
