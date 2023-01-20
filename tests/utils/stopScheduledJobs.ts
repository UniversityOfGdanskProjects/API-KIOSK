import schedule from 'node-schedule';

export const stopScheduledJobs = (): void => {
    const scheduledJobsNames = Object.keys(schedule.scheduledJobs);

    scheduledJobsNames.forEach((job) => schedule.cancelJob(job));
};
