import { mapNewsCategory } from './returnCategoryEnum';
import { NewsCategory } from '../../Types/News.type';

describe('returnCategoryEnum', () => {
    it('returns NEWS', () => {
        const category = 'Wydarzenia';
        expect(mapNewsCategory(category)).toEqual(NewsCategory.NEWS);
    });
    it('returns NEWS', () => {
        const category = 'Aktualności';
        expect(mapNewsCategory(category)).toEqual(NewsCategory.NEWS);
    });
    it('returns NEWS', () => {
        const category = 'category';
        expect(mapNewsCategory(category)).toEqual(NewsCategory.NEWS);
    });
    it('returns STUDENTS', () => {
        const category = 'Dla studentów';
        expect(mapNewsCategory(category)).toEqual(NewsCategory.STUDENTS);
    });
    it('returns ARCHIVE', () => {
        const category = 'Archiwum aktualności';
        expect(mapNewsCategory(category)).toEqual(NewsCategory.ARCHIVE);
    });
});
