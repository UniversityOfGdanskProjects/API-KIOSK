import { getYearFromMajorName } from './getYearFromMajorName';

describe('getYearFromMajorName', () => {
    it.only("Transform 'informatyka (O): I rok' to object '{ name: 'informatyka (O)', year: 1 }'", () => {
        const majorName = 'informatyka (O): I rok';
        const result = getYearFromMajorName(majorName);

        expect(result.name).toBe('informatyka (O)');
        expect(result.year).toBe(1);
    });

    it.only("Transform 'informatyka 2 st.: II rok' to object '{ name: 'informatyka 2 st.', year: 2 }'", () => {
        const majorName = 'informatyka 2 st.: II rok';
        const result = getYearFromMajorName(majorName);

        expect(result.name).toBe('informatyka 2 st.');
        expect(result.year).toBe(2);
    });
});
