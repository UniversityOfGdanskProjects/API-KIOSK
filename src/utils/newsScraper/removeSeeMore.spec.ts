import { removeSeeMore } from './removeSeeMore';

describe('removeSeeMore', () => {
    it('removes see more from the end of a string', () => {
        const text = 'Usun... więcej';
        expect(removeSeeMore(text)).toEqual('Usun...');
    });
    it('doesnt remove see more from the end of a string', () => {
        const text = 'Nie usuwaj...';
        expect(removeSeeMore(text)).toEqual('Nie usuwaj...');
    });
});
