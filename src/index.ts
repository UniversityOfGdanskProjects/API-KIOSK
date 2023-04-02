import { updateLessons } from './Schedulers/lessonsPlans.scheduler';
import { updateMajors } from './Schedulers/majors.scheduler';
import { updateStaff } from './Schedulers/staffScheduler';
import { updateNews } from './Schedulers/news.scheduler';
import { connectToDB } from './Configs/db.config';
import schedule from 'node-schedule';
import { app } from './app';

const PORT = process.env.PORT || 3001;

connectToDB();

schedule.scheduleJob('lessonsPlanUpdate', '0 0 * * *', updateLessons);
schedule.scheduleJob('staffUpdate', '0 0 * * *', updateStaff);
schedule.scheduleJob('majorsUpdate', '0 0 * * *', updateMajors);
schedule.scheduleJob('newsUpdate', '0 0 * * *', updateNews);

const server = app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

export { server };
