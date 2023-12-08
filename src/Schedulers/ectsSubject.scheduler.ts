import { EctsModel } from '../Models/ectsSubject.model';
import { ectsScrapper } from '../Services/EctsScrapper/ectsScrapper.service';

export const updateEctsSubject = async (): Promise<void> => {
    try {
        const scrappedEctsSubjects = await ectsScrapper();

        await EctsModel.deleteMany({});
        await EctsModel.insertMany(scrappedEctsSubjects);
    } catch (error) {
        console.log(error);
    }
};
