import { NewsCategoryEnum } from '../../Types/News.type';
export const returnCategoryEnum = (category: string): NewsCategoryEnum => {
    switch (category) {
        case 'Wydarzenia':
        case 'Aktualności':
            return NewsCategoryEnum.NEWS;
        case 'Dla studentów':
            return NewsCategoryEnum.STUDENTS;
        case 'Archiwum aktualności':
            return NewsCategoryEnum.ARCHIVE;
        default:
            return NewsCategoryEnum.NEWS;
    }
};
