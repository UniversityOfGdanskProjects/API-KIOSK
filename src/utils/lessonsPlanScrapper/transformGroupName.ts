export const transformGroupName = (
    majorName: string,
    groupName: string
): string => {
    if (majorName.includes('bezpieczeństwo jądrowe')) {
        if (majorName === groupName) return 'all';

        return groupName[groupName.length - 1];
    }

    if (majorName === groupName || majorName + '.' === groupName) return 'all';

    const groupRegex = /gr. (?<group>[0-9]*)/;

    const groupNumber = groupName.match(groupRegex)?.groups?.group;

    if (groupNumber) return groupNumber as string;

    const specialtyRegex = /sp. [a-zA-Z]*/;

    const specialtyName = groupName.match(specialtyRegex)?.[0];

    if (specialtyName) return specialtyName;

    const labRegex = /lab.(?<group>[0-9]*)/;

    const labNumber = groupName.match(labRegex)?.groups?.group;

    if (labNumber) return labNumber;

    const groupNameWithoutMajorName = groupName.replace(majorName + '.', '');

    if (groupNameWithoutMajorName !== groupName)
        return groupNameWithoutMajorName;

    return groupName;
};
