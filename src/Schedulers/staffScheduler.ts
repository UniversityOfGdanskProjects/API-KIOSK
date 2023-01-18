import { staffScraper } from '../Services/staffScraper.service';
import { StaffModel } from '../Models/staff.model';

export const updateStaff = async () => {
    try {
        const staff = await staffScraper();
        const docs = await StaffModel.find({}, { _id: 0, __v: 0 });
        if (JSON.stringify(staff) != JSON.stringify(docs)) {
            await StaffModel.deleteMany({});
            await StaffModel.insertMany(staff);
            console.log('Staff updated');
        }
    } catch (error) {
        console.log(error);
    }
};
