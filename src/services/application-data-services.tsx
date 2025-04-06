// Type: Service
import { fetchApplications } from './application-services';

// Type: type
import { JobApplication } from "../types/applicationInfo";

//Datapoints to capture here:
// 1. Names of companies I've applied to
// 2. Locations of companies I've applied to
// 3. Sizes of companies I've applied to
// 4. Companies that have responded to my applications
// 5. Companies that have rejected my applications
// 6. Companies that have given me an interview
// 7. Companies that have given me an offer
// 8. Companies that have ghosted me
// 9. Companies that have given me feedback
// 10. Companies that have not given me feedback
// 11. Speed of responses from companies (in days)
// 12. Average time taken to get an interview after applying (in days)
// 13. Average time taken to get an offer after applying (in days)
// 14. Average time taken to get rejected after applying (in days)
// 15. Most type of rejections (e.g. no response, generic rejection, etc.)
// 16. Most common rejection reasons (e.g. lack of experience, skills, etc.)
// 17. Most common interview feedback (e.g. good communication, lack of skills, etc.)

//Stat Cards for dashboard:
// 1. How many applications I've submitted today
// 2. Goal for applications to submit today
// 3. How many applications I've submitted this week
// 4. Goal for applications to submit this week
// 5. Application rate (per day)

//Stat Cards for statistics page:
// 1. Total jobs applied to
// 2. Application rate (per day)
// 3. Rejection rate (per 5 application)
// 4. Interview rate (per 5 application)
// 5. Application to Offer rate (per application)
// 6. Ghosted rate (per application)

// const allApplications = await fetchApplications();

export const getMostRecentApplications = async (applications: JobApplication[]): Promise<JobApplication[]> => {
      
  return new Promise<JobApplication[]>((resolve, reject) => {
    // Fetch all applications and sort them by created date in descending order
    // Then slice the first 5 to get the most recent applications
    // If there is an error, reject the promise with the error message
    // If successful, resolve the promise with the most recent applications
    // Note: This is a simple implementation. In a real-world scenario, you might want to handle errors more gracefully.
    // For example, you could log the error and return an empty array or a default value.
    try {
      const mostRecentApplications = applications.sort((a:JobApplication, b:JobApplication) => new Date(String(b.createdOn))
      .getTime() - new Date(String(a.createdOn)).getTime())
      .slice(0, 5);
      resolve(mostRecentApplications);
    } catch (error) {
      console.error("Error fetching applications: ", error);
      reject(error);
    }  
  }) 
}
// export const getMostRecentApplications = async (): Promise<JobApplication[]> => {
      
//   return new Promise<JobApplication[]>((resolve, reject) => {
//     // Fetch all applications and sort them by created date in descending order
//     // Then slice the first 5 to get the most recent applications
//     // If there is an error, reject the promise with the error message
//     // If successful, resolve the promise with the most recent applications
//     // Note: This is a simple implementation. In a real-world scenario, you might want to handle errors more gracefully.
//     // For example, you could log the error and return an empty array or a default value.
//     fetchApplications()
//       .then((applications: JobApplication[]) => {
//         const mostRecentApplications = applications
//           .sort((a, b) => new Date(String(b.createdOn)).getTime() - new Date(String(a.createdOn)).getTime())
//           .slice(0, 5);
//         resolve(mostRecentApplications);
//       })
//       .catch((error) => {
//         console.error("Error fetching applications: ", error);
//         reject(error.message);
//       });
//   }) 
// }

export const getNumberOfApplicationsToday = async (applications: JobApplication[]): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    // Fetch all applications and filter them by today's date
    try {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      const applicationsToday = applications.filter((application: JobApplication) => 
        application.createdOn && new Date(application.createdOn).toISOString().split('T')[0] === today
      );
      resolve(applicationsToday.length);
    } catch (error) {
      console.error("Error fetching applications: ", error);
      reject(error);
    };
  });
};