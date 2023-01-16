export const transformCSVHeader = (header: string, index: number): string => {
    switch (header) {
        case 'dzien':
            return 'day';
        case 'godz':
            return 'start';
        case 'czas':
            return 'duration';
        case 'przedmiot':
            return 'subject';
        case 'grupa':
            return 'group';
        case 'nauczyciel':
            return 'teacher';
        case 'sala':
            return 'class';
        case 'typ':
            return 'type';
        case 'uwagi':
            return 'info';
        case 'dataod':
            return 'start_date';
        case 'datado':
            return 'end_date';
        default:
            return header;
    }
};
