import { getAllEvents } from '../Controllers/events.controller';
import { Router } from 'express';

const eventsRouter = Router();

eventsRouter.get('/events', getAllEvents);

export default eventsRouter;
