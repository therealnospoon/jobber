//Packages
import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

//Contexts
import { useApplicationContext } from "../contexts/application-context";

//Components
import Header from "../components/common/Header";
import ApplicationModal from "../components/common/modals/ApplicationModal";
import ConfirmationModal from "../components/common/modals/ConfirmationModal";

//Applications types & enums
import { JobApplication } from "../types/applicationInfo";

//Services
import {
  fetchApplications,
  addNewApplication,
  updateApplication,
  deleteApplication,
} from "../services/application-services";
import { Link } from "react-router-dom";

//Icons
import { Trash, Edit, Link2, ChevronUp, ChevronDown } from "lucide-react";

const Applications: React.FC = () => {
  const [sortableApplications, setSortableApplications] = useState<
    JobApplication[]
  >([]);
  const { applications, setApplications } = useApplicationContext();
  const [activeTab, setActiveTab] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);
  const [applicationToDelete, setApplicationToDelete] =
    useState<JobApplication | null>(null);
  const [sortConfig, setSortConfig] = useState({
    key: "createdOn", // Default sort by date applied
    direction: "desc", // Default sort by most recent applications
  });

  useEffect(() => {
    const sortableApplications = [...applications];

    sortableApplications.sort((a, b) => {
      // Tell TypeScript this is a valid key of JobApplication
      const aValue = a[sortConfig.key as keyof JobApplication];
      const bValue = b[sortConfig.key as keyof JobApplication];

      // Handle undefined values in the comparison
      if (aValue === undefined && bValue === undefined) {
        return 0;
      }
      if (aValue === undefined) {
        return 1; // Undefined values sort last
      }
      if (bValue === undefined) {
        return -1; // Undefined values sort last
      }

      // Now TypeScript knows aValue and bValue are both defined
      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortableApplications(sortableApplications);
  }, [sortConfig, applications]);

  useEffect(() => {
    console.log("selectedApplication changed:", selectedApplication);
  }, [selectedApplication]);

  const requestSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName: string) => {
    if (sortConfig.key !== columnName) {
      return null;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="inline-block ml-1" size={14} />
    ) : (
      <ChevronDown className="inline-block ml-1" size={14} />
    );
  };

  const handleAddNewJobEntry = useCallback(
    (application: JobApplication) => {
      console.log("Running handle Add New Job Entry");
      const newApplication: JobApplication = {
        company: application.company,
        position: application.position,
        dateApplied: application.dateApplied,
        status: application.status,
        notes: application.notes,
        url: application.url,
        jobLocation: application.jobLocation,
        companySize: application.companySize,
        response: application.response,
        responseType: application.responseType,
        responseDate: application.responseDate,
        rejected: application.rejected,
        rejectedReason: application.rejectedReason,
      };

      try {
        addNewApplication(newApplication).then(() => {
          fetchApplications().then((applications: JobApplication[]) => {
            setApplications([...applications]);
          });

          console.log("New job added:", newApplication);
        });
      } catch (error) {
        console.error("Failed to add new application:", error);
      }
    },
    [setApplications]
  );

  const handleUpdateApplication = useCallback(
    (application: JobApplication) => {
      console.log("Running handleUpdateApplication");
      const applicationToUpdate: JobApplication = {
        _id: application._id,
        company: application.company,
        position: application.position,
        dateApplied: application.dateApplied,
        status: application.status,
        notes: application.notes,
        url: application.url,
        jobLocation: application.jobLocation,
        companySize: application.companySize,
        response: application.response,
        responseType: application.responseType,
        responseDate: application.responseDate,
        rejected: application.rejected,
        rejectedReason: application.rejectedReason,
      };

      try {
        updateApplication(applicationToUpdate).then((updatedApp) => {
          fetchApplications().then((applications: JobApplication[]) => {
            setApplications([...applications]);
          });
          console.log("Job application updated:", updatedApp);
        });
      } catch (error) {
        console.error("Failed to add new application:", error);
      }
    },
    [setApplications]
  );

  const handleDeleteApplication = (applicationID: string | undefined) => {
    try {
      deleteApplication(applicationID).then(() => {
        console.log("Deleted application with ID:", applicationID);

        fetchApplications().then((applications: JobApplication[]) => {
          setApplications([...applications]);
        });
      });
    } catch (error) {
      console.error("Failed to add new application:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  const handleConfirmationModalClose = () => {
    setApplicationToDelete(null);
    setIsConfirmationModalOpen(false);
  };

  const tabs = ["All", "Applied", "Interview", "Offer", "Rejected"];

  const sortedApplications =
    activeTab === "All"
      ? sortableApplications
      : sortableApplications.filter((job) => job.status === activeTab);

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800";
      case "Interview":
        return "bg-purple-100 text-purple-800";
      case "Offer":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Phone Screen":
        return "bg-yellow-100 text-yellow-800";
      case "Final Round":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Applications" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="card mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="card-header flex justify-end items-center p-6 border-b border-gray-100">
              {/* <div className="card-title text-xl font-semibold text-gray-800">All Applications</div> */}
              <button
                className="btn btn-secondary px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                onClick={() => {
                  setSelectedApplication(null);
                  setIsModalOpen(true);
                }}
              >
                Add New
              </button>
            </div>

            <div className="tabs flex border-b border-gray-100">
              {tabs.map((tab) => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab py-3 px-6 cursor-pointer transition-colors ${
                    activeTab === tab
                      ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </div>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="job-list w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th
                      className="px-6 py-3 cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort("company")}
                    >
                      Company {getSortIcon("company")}
                    </th>
                    <th
                      className="px-6 py-3 cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort("position")}
                    >
                      Position {getSortIcon("position")}
                    </th>
                    <th
                      className="px-6 py-3 cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort("dateApplied")}
                    >
                      Date Applied {getSortIcon("dateApplied")}
                    </th>
                    <th
                      className="px-6 py-3 cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort("status")}
                    >
                      Status {getSortIcon("status")}
                    </th>
                    <th className="px-6 py-3">Job Posting</th>
                    <th className="px-6 py-3">Notes</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedApplications.map((job, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {job.company}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-700">{job.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {job.dateApplied.split("T")[0]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`status status-${job.status.toLowerCase()} px-3 py-1 inline-flex text-xs font-medium rounded-full ${getStatusClasses(
                            job.status
                          )}`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="max-w-52">
                        <Link to={job.url} className="text-gray-700">
                          <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-zinc-200 transition-colors">
                            <Link2
                              size={20}
                              style={{ color: "blue", minWidth: "20px" }}
                            />
                            <span className="ml-4 whitespace-nowrap">
                              URL link
                            </span>
                          </motion.div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-pre-wrap md:whitespace-nowrap">
                        <span className="text-gray-700">{job.notes}</span>
                      </td>
                      <td className="px-6 py-4 flex items-center justify-center gap-1">
                        <button
                          className="btn px-3 py-1 hover:bg-zinc-100 rounded-md text-sm transition-colors"
                          onClick={() => {
                            setSelectedApplication(job);
                            setIsModalOpen(true);
                          }}
                        >
                          <Edit
                            size={20}
                            style={{ color: "purple", minWidth: "20px" }}
                          />
                        </button>
                        <button
                          className="btn px-3 py-1 hover:bg-zinc-100 rounded-md text-sm transition-colors"
                          onClick={() => {
                            setApplicationToDelete(job);
                            setIsConfirmationModalOpen(true);
                          }}
                        >
                          <Trash
                            size={20}
                            style={{ color: "red", minWidth: "10px" }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </main>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => handleCloseModal()}
        onConfirm={
          selectedApplication ? handleUpdateApplication : handleAddNewJobEntry
        }
        existingApplication={
          selectedApplication !== null ? selectedApplication : null
        }
      />

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => {
          // setSelectedApplication(null);
          handleConfirmationModalClose();
        }}
        onConfirm={() => {
          if (applicationToDelete) {
            handleDeleteApplication(applicationToDelete._id);
          }
        }}
      />
    </div>
  );
};

export default Applications;
