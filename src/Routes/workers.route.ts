import { getAllWorkers } from '../Controllers/workers.controller';
import { Router } from 'express';

const workersRouter = Router();

workersRouter.get('/workers', getAllWorkers);

export default workersRouter;
