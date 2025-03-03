import { JobApplication } from "../types/applicationInfo";

export const convertDatesToISO = (jobsArray: JobApplication[]) => {
    return jobsArray.map(job => {
      // Create a new object with the same properties
      const updatedJob = {...job};
      
      // Convert the dateApplied string to a Date object, then to ISO string
      updatedJob.dateApplied = new Date(job.dateApplied).toISOString();
      
      return updatedJob;
    });
}