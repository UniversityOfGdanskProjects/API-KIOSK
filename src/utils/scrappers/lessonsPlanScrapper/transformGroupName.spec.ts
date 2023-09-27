import { transformGroupName } from './transformGroupName';

describe('transformGroupName', () => {
    it.only("Transform 'informatyka (O): I rok gr. 2' to '2'", () => {
        const result = transformGroupName(
            'informatyka (O): I rok',
            'informatyka (O): I rok gr. 2'
        );

        expect(result).toBe('2');
    });

    it.only("Transform 'informatyka (O): I rok' to 'all'", () => {
        const result = transformGroupName(
            'informatyka (O): I rok',
            'informatyka (O): I rok'
        );

        expect(result).toBe('all');
    });

    it.only("Transform 'matematyka: III rok sp. nauczycielska' to 'sp. nauczycielska'", () => {
        const result = transformGroupName(
            'matematyka: III rok',
            'matematyka: III rok sp. nauczycielska'
        );

        expect(result).toBe('sp. nauczycielska');
    });

    it.only("Transform '1BF2r.lab.1' to '1'", () => {
        const result = transformGroupName('1BF2r', '1BF2r.lab.1');

        expect(result).toBe('1');
    });

    it.only("Transform '1BF2r.I' to 'I'", () => {
        const result = transformGroupName('1BF2r', '1BF2r.I');

        expect(result).toBe('I');
    });

    it.only("Transform '1BJ1r.3' to '3'", () => {
        const result = transformGroupName(
            'bezpieczeństwo jądrowe: I rok',
            '1BJ1r.3'
        );

        expect(result).toBe('3');
    });

    it.only("Transform 'bezpieczeństwo jądrowe: II rok' to 'all'", () => {
        const result = transformGroupName(
            'bezpieczeństwo jądrowe: II rok',
            'bezpieczeństwo jądrowe: II rok'
        );

        expect(result).toBe('all');
    });
});
