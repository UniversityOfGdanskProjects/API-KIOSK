import { transformCSVHeader } from './transformCSVHeader';

describe('transformCSVHeader', () => {
    it.only("transform 'dzien' to 'day'", () => {
        const result = transformCSVHeader('dzien', 0);
        expect(result).toBe('day');
    });

    it.only("transform 'godz' to 'start'", () => {
        const result = transformCSVHeader('godz', 0);
        expect(result).toBe('start');
    });

    it.only("transform 'czas' to 'duration'", () => {
        const result = transformCSVHeader('czas', 0);
        expect(result).toBe('duration');
    });

    it.only("transform 'przedmiot' to 'subject'", () => {
        const result = transformCSVHeader('przedmiot', 0);
        expect(result).toBe('subject');
    });

    it.only("transform 'grupa' to 'groups'", () => {
        const result = transformCSVHeader('grupa', 0);
        expect(result).toBe('groups');
    });

    it.only("transform 'nauczyciel' to 'teachers'", () => {
        const result = transformCSVHeader('nauczyciel', 0);
        expect(result).toBe('teachers');
    });

    it.only("transform 'sala' to 'class'", () => {
        const result = transformCSVHeader('sala', 0);
        expect(result).toBe('class');
    });

    it.only("transform 'typ' to 'type'", () => {
        const result = transformCSVHeader('typ', 0);
        expect(result).toBe('type');
    });

    it.only("transform 'uwagi' to 'info'", () => {
        const result = transformCSVHeader('uwagi', 0);
        expect(result).toBe('info');
    });

    it.only("transform 'dataod' to 'start_date'", () => {
        const result = transformCSVHeader('dataod', 0);
        expect(result).toBe('start_date');
    });

    it.only("transform 'datado' to 'end_date'", () => {
        const result = transformCSVHeader('datado', 0);
        expect(result).toBe('end_date');
    });
});
