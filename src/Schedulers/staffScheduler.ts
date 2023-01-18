import axios from 'axios';
import { StaffModel } from '../Models/staff.model';

export const updateStaff = async () => {
    try {
        const staff = await axios.get('http://localhost:3001/staff');
        const docs = await StaffModel.find({}, { _id: 0, __v: 0 });
        if (JSON.stringify(staff.data) != JSON.stringify(docs)) {
            await StaffModel.deleteMany({});
            await StaffModel.insertMany(staff.data);
            console.log('Staff updated');
        }
    } catch (e) {
        console.log(e);
    }
};
