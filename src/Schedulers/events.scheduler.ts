import { eventsScraper } from '../Services/eventsScraper.service';
import { EventsModel } from '../Models/events.model';

export const updateEvents = async () => {
    try {
        const events = await eventsScraper();

        await EventsModel.deleteMany({});
        await EventsModel.insertMany(events);
        console.log('Events updated');
    } catch (error) {
        console.log(error);
    }
};
