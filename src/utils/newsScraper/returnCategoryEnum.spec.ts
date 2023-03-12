import { returnCategoryEnum } from './returnCategoryEnum';
import { NewsCategoryEnum } from '../../Types/News.type';

describe('returnCategoryEnum', () => {
    it('returns NEWS', () => {
        const category = 'Wydarzenia';
        expect(returnCategoryEnum(category)).toEqual(NewsCategoryEnum.NEWS);
    });
    it('returns NEWS', () => {
        const category = 'Aktualności';
        expect(returnCategoryEnum(category)).toEqual(NewsCategoryEnum.NEWS);
    });
    it('returns NEWS', () => {
        const category = 'category';
        expect(returnCategoryEnum(category)).toEqual(NewsCategoryEnum.NEWS);
    });
    it('returns STUDENTS', () => {
        const category = 'Dla studentów';
        expect(returnCategoryEnum(category)).toEqual(NewsCategoryEnum.STUDENTS);
    });
    it('returns ARCHIVE', () => {
        const category = 'Archiwum aktualności';
        expect(returnCategoryEnum(category)).toEqual(NewsCategoryEnum.ARCHIVE);
    });
});
