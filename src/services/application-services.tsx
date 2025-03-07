import axios from "axios";
import { JobApplication } from "../types/applicationInfo";

const API_BASE_URL = "http://localhost:8000";

export const fetchApplications = async () => {
  const response = await axios.get(`${API_BASE_URL}/job_application_entries`);
  if (response.status !== 200) {
    throw new Error('Failed to fetch applications');
  } else {
    console.log(response.data);
  }

  return response.data;
}

export const addNewApplication = async (newApplication: JobApplication) => {
  const response = await axios.post(`${API_BASE_URL}/job_application_entries`, newApplication);
  if (response.status !== 201) {
    throw new Error('Failed to add new application');
  } else {
    console.log(response.data);
  }

  return response.data;
}