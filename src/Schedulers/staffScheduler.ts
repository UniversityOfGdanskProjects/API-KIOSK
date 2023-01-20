import { staffScraper } from '../Services/staffScraper.service';
import { StaffModel } from '../Models/staff.model';

export const updateStaff = async () => {
    try {
        const staff = await staffScraper();

        await StaffModel.deleteMany({});
        await StaffModel.insertMany(staff);
        console.log('Staff updated');
    } catch (error) {
        console.log(error);
    }
};
