import { createContext, useContext } from "react";

import React from "react";

import { JobApplication } from "../types/applicationInfo";

export const ApplicationContext = createContext(
  {} as {
    applications: JobApplication[] | undefined;
    setApplications: React.Dispatch<React.SetStateAction<JobApplication[]>>;
  }
);

export const useApplicationContext = () => {
  const { applications, setApplications } = useContext(ApplicationContext);

  if (!applications || !setApplications) {
    throw new Error(
      "useApplicationContext must be used within an ApplicationContextProvider"
    );
  }
  return { applications, setApplications };
};
