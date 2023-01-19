export const transformCSVField = (
    value: string,
    field: string
): string | string[] => {
    const transformDay = (day: string) => {
        switch (day) {
            case 'Poniedziałek':
                return 'Monday';
            case 'Wtorek':
                return 'Tuesday';
            case 'Środa':
                return 'Wednesday';
            case 'Czwartek':
                return 'Thursday';
            case 'Piątek':
                return 'Friday';
            default:
                return day;
        }
    };

    if (field === 'info') {
        if (value === '') return [];

        return value.split('; ');
    }

    if (field === 'day') return transformDay(value);

    if (field === 'type') {
        if (value === 'wyk.') return 'wykład';

        if (value === 'lab.') return 'laboratorium';

        if (value === 'ćw.') return 'ćwiczenia';

        if (value === 'ćw.+wyk.' || value === 'wyk.+ćw.')
            return 'ćwiczenia i wykład';

        if (value === 'wyk.+lab.') return 'laboratorium i wykład';

        return value;
    }

    if (field === 'groups') return value.split('+');

    if (field === 'teachers') return value.split('+');

    return value;
};
