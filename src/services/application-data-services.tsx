// Type: Service
import { fetchApplications } from './application-services';

// Type: type
import { JobApplication } from "../types/applicationInfo";

export const getMostRecentApplications = async (): Promise<JobApplication[]> => {
      
  return new Promise<JobApplication[]>((resolve, reject) => {
    // Fetch all applications and sort them by created date in descending order
    // Then slice the first 5 to get the most recent applications
    // If there is an error, reject the promise with the error message
    // If successful, resolve the promise with the most recent applications
    // Note: This is a simple implementation. In a real-world scenario, you might want to handle errors more gracefully.
    // For example, you could log the error and return an empty array or a default value.
    fetchApplications()
      .then((applications: JobApplication[]) => {
        const mostRecentApplications = applications
          .sort((a, b) => new Date(String(b.createdOn)).getTime() - new Date(String(a.createdOn)).getTime())
          .slice(0, 5);
        resolve(mostRecentApplications);
      })
      .catch((error) => {
        console.error("Error fetching applications: ", error);
        reject(error.message);
      });
  }) 
}
    
