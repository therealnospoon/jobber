import { useEffect, useState } from 'react'

import React from 'react'

import { JobApplication } from '../../types/applicationInfo'

import { fetchApplications } from '../../services/application-services'
// This is the provider component for the ApplicationContext. It fetches the job applications from the server and provides them to the context.

import { ApplicationContext } from '../application-context'

const ApplicationContextProvider:React.FC<React.PropsWithChildren<object>> = ({children}) => {
  const [applications, setApplications] = useState([] as JobApplication[]);

  useEffect(() => {
      fetchApplications()
        .then((applications: JobApplication[]) => {
          setApplications([...applications]);
        });
  }, []);

  return (
    <ApplicationContext.Provider value={{applications, setApplications}}>
      {children}
    </ApplicationContext.Provider>
  )

} 

export default ApplicationContextProvider