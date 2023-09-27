export const fixMajorName = (name: string) => {
    switch (name) {
        case 'Tryb stacjonarny':
            return 'Informatyka tryb stacjonarny';
        case 'Profil ogólnoakademicki':
            return 'Informatyka profil ogólnoakademicki';
        case 'Profil praktyczny':
            return 'Informatyka profil praktyczny';
        case 'Tryb niestacjonarny':
            return 'Informatyka tryb niestacjonarny';
        default:
            return name;
    }
};
