import { transformCSVField } from './transformCSVField';

describe('transformCSVField', () => {
    it.only("Transforms 'info' to array", () => {
        const info = 'information 1; information 2';
        const result = transformCSVField(info, 'info');

        expect(result[0]).toBe('information 1');
        expect(result[1]).toBe('information 2');
    });

    it.only('Translates day from polish to english', () => {
        const day = 'Poniedziałek';
        const result = transformCSVField(day, 'day');

        expect(result).toBe('Monday');
    });

    it.only("Transforms type 'wyk.' to 'wykład'", () => {
        const result = transformCSVField('wyk.', 'type');
        expect(result).toBe('wykład');
    });

    it.only("Transforms type 'lab.' to 'laboratorium'", () => {
        const result = transformCSVField('lab.', 'type');
        expect(result).toBe('laboratorium');
    });

    it.only("Transforms type 'ćw.' to 'ćwiczenia'", () => {
        const result = transformCSVField('ćw.', 'type');
        expect(result).toBe('ćwiczenia');
    });

    it.only("Transforms type 'ćw.+wyk.' and 'wyk.+ćw.' to 'ćwiczenia i wykład'", () => {
        const firstResult = transformCSVField('ćw.+wyk.', 'type');
        const secondResult = transformCSVField('wyk.+ćw.', 'type');

        expect(firstResult).toBe('ćwiczenia i wykład');
        expect(secondResult).toBe('ćwiczenia i wykład');
    });

    it.only("Transforms type 'wyk.+lab.' to 'laboratorium i wykład'", () => {
        const result = transformCSVField('wyk.+lab.', 'type');
        expect(result).toBe('laboratorium i wykład');
    });

    it.only("Transforms groups 'gr1+gr2' to array", () => {
        const result = transformCSVField('gr1+gr2', 'groups');

        expect(result[0]).toBe('gr1');
        expect(result[1]).toBe('gr2');
    });

    it.only("Transforms groups 'gr1' to array", () => {
        const result = transformCSVField('gr1', 'groups');

        expect(result[0]).toBe('gr1');
    });

    it.only("Transforms teachers 'teacher1+teacher2' to array", () => {
        const result = transformCSVField('teacher1+teacher2', 'teachers');

        expect(result[0]).toBe('teacher1');
        expect(result[1]).toBe('teacher2');
    });

    it.only("Transforms teachers 'teacher1' to array", () => {
        const result = transformCSVField('teacher1', 'teachers');

        expect(result[0]).toBe('teacher1');
    });
});
