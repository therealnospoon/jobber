//Packages
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Users, ShoppingBag, BarChart2 } from "lucide-react";

//Types
import { JobApplication } from "../types/applicationInfo";

//Services
import {
  getMostRecentApplications,
  getNumberOfApplicationsToday,
} from "../services/application-data-processor";

//Components
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesChannelChart from "../components/dashboard/SalesChannelChart";

//Contexts
import { useApplicationContext } from "../contexts/application-context";

//Stat Cards for dashboard:
// 1. How many applications I've submitted today
// 2. Goal for applications to submit today
// 3. How many applications I've submitted this week
// 4. Goal for applications to submit this week
// 5. Application rate (per day)

//Components:
// 1. Stat Cards (Including one that has the goal for applications to submit today and this week and it turns red as the week progresses)
// 2. Recent Applications Table
// 3. Maybe one chart showing rate of applications/responses over time
// 4. Possible todo list?
// 5. Table of stale applications (applications that haven't been updated in a while)

const Dashboard: React.FC = () => {
  const { applications } = useApplicationContext();
  const [recentApps, setRecentApps] = useState<JobApplication[]>([]);
  const [timeOfDay] = useState<string>(
    new Date().getHours() < 12
      ? "morning"
      : new Date().getHours() < 18
      ? "afternoon"
      : "evening"
  );
  const [activeTab, setActiveTab] = useState<string>("All");
  const [applicationsToday, setApplicationsToday] = useState<number>(0);
  const greetingsMessage = `Good ${timeOfDay}, Tim. Let's get to work!`.split(
    ""
  );

  useEffect(() => {
    getMostRecentApplications(applications)
      .then((appArray: JobApplication[]) => {
        setRecentApps(appArray);
      })
      .catch((error: string) => {
        console.error("Error fetching applications: ", error);
      });

    getNumberOfApplicationsToday(applications)
      .then((appsToday: number) => {
        setApplicationsToday(appsToday);
      })
      .catch((error: string) => {
        console.error("Error fetching applications: ", error);
      });
  }, [applications]);

  const tabs = ["All", "Follow-up", "Stale"];

  const filteredApplications =
    activeTab === "All"
      ? recentApps
      : recentApps.filter((job) => job.status === activeTab);

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
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Dashboard" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div className="mb-6">
          {greetingsMessage.map((char, i) => (
            <motion.span
              className="text-2xl font-semibold text-gray-800 inline-block"
              // Animate each character with a delay based on its index
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.1,
                delay: i / 15,
              }}
              key={i}
            >
              {
                char === " " ? <span className="inline-block w-2" /> : null // Add space for better readability
              }
              {char}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* These should gradually change colors depending on how good the rate is */}
          <StatCard
            name="Applications submitted today"
            icon={Zap}
            value={applicationsToday}
            color="#6366F1"
          />
          <StatCard
            name="Daily goal"
            icon={Users}
            value={
              applications.filter((app) => app.status == "Interview").length
            }
            color="#8B5CF6"
          />
          <StatCard
            name="Weekly goal"
            icon={ShoppingBag}
            value={
              applications.filter((app) => app.status == "Rejected").length
            }
            color="#EC4899"
          />
          <StatCard
            name="Your productivity rate"
            icon={BarChart2}
            value={applications.filter((app) => app.status == "Offer").length}
            color="#10B981"
          />
        </motion.div>

        {/* Pinned applications table*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pinned Applications */}
          <div className="card bg-zinc-50 shadow-lg rounded-xl p-6 overflow-hidden">
            <div className="card-header bg-zinc-50 flex justify-between items-center p-6 border-b border-gray-100">
              <div className="card-title bg-zinc-50 text-xl font-semibold text-gray-800">
                Pinned Applications
              </div>
              <a
                href="/applications"
                className="btn btn-secondary px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                View All
              </a>
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
                    <th className="px-6 py-3">Company</th>
                    <th className="px-6 py-3">Position</th>
                    <th className="px-6 py-3">Date Applied</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredApplications.map((job, index) => (
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="btn px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-sm transition-colors">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* To do list */}
          <div className="card bg-zinc-50 shadow-lg rounded-xl p-6 overflow-hidden">
            <div className="card-header bg-zinc-50 flex justify-between items-center p-6 border-b border-gray-100">
              <div className="card-title bg-zinc-50 text-xl font-semibold text-gray-800">
                To Do List
              </div>
              <a
                href="/applications"
                className="btn btn-secondary px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                View All
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="job-list w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3">Task</th>
                    <th className="px-6 py-3">Due Date</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        Update resume
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-700">Today</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="status status-applied px-3 py-1 inline-flex text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        In Progress
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="btn px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-sm transition-colors">
                        Details
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        Apply to 5 jobs
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-700">Tomorrow</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="status status-interview px-3 py-1 inline-flex text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                        Not Started
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="btn px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-sm transition-colors">
                        Details
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        Prepare for interview
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-700">Next Week</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="status status-offer px-3 py-1 inline-flex text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="btn px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-sm transition-colors">
                        Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <SalesChannelChart />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
