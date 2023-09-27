import { fixMajorName } from './fixMajorName';

describe('fixMajorName', () => {
    it('Tryb stacjonarny', () => {
        expect(fixMajorName('Tryb stacjonarny')).toEqual(
            'Informatyka tryb stacjonarny'
        );
    });

    it('Profil ogólnoakademicki', () => {
        expect(fixMajorName('Profil ogólnoakademicki')).toEqual(
            'Informatyka profil ogólnoakademicki'
        );
    });

    it('Profil praktyczny', () => {
        expect(fixMajorName('Profil praktyczny')).toEqual(
            'Informatyka profil praktyczny'
        );
    });

    it('Tryb niestacjonarny', () => {
        expect(fixMajorName('Tryb niestacjonarny')).toEqual(
            'Informatyka tryb niestacjonarny'
        );
    });

    it('other majors arent altered', () => {
        expect(fixMajorName('Fizyka')).toEqual('Fizyka');
        expect(fixMajorName('Bioinformatyka')).toEqual('Bioinformatyka');
    });
});
