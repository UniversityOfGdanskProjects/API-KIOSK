interface MajorNameAndYear {
    name: string;
    year: number;
}

export const getYearFromMajorName = (majorName: string): MajorNameAndYear => {
    const [name, year] = majorName.split(': ');

    if (year.startsWith('I ')) return { name: name, year: 1 };

    if (year.startsWith('II ')) return { name: name, year: 2 };

    return { name: name, year: 3 };
};
