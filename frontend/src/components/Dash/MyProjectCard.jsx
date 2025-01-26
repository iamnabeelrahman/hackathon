import React, { useState } from "react";
import { User, Calendar, List, Users } from "lucide-react";
import ApplicantAccordion from "./ApplicantAccordion";

function MyProjectCard({ project }) {
  const [isSeeApplications, setIsSeeApplications] = useState(false);
  const applicants = [
    {
      name: "John Doe",
      number: "123-456-7890",
      email: "johndoe@example.com",
      timestamp: "2025-01-26 10:00 AM",
    },
    {
      name: "Jane Smith",
      number: "987-654-3210",
      email: "janesmith@example.com",
      timestamp: "2025-01-26 11:30 AM",
    },
  ];
  return (
    <>
      <div
        className={`bg-gray-800 ${
          isSeeApplications && "w-[1440px]"
        } rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300`}
      >
        <div
          className={`text-white text-sm px-4 py-2 font-semibold ${
            project.projectStatus === "Building MVP"
              ? "bg-red-500"
              : project.projectStatus === "MVP Stage"
              ? "bg-blue-500"
              : "bg-purple-500"
          }`}
        >
          {project.projectStatus}
        </div>
        {/* My Project */}
        <div className="flex gap-20">
          <div className={`p-4 ${isSeeApplications && "w-[900px]"}`}>
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{project.desc}</p>
            <div className="flex items-center justify-between pr-30 relative">
              <div className="">
                <div className="flex items-center text-sm mb-2">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  <span>Project Manager: {project.projectManager}</span>
                </div>
                <div className="flex items-center text-sm mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span>Posted: {project.postedDate}</span>
                </div>
                <div className="flex items-center text-sm mb-2">
                  <List className="w-4 h-4 mr-2 text-gray-400" />
                  <span>Category: {project.category}</span>
                </div>
                <div className="flex items-center text-sm mb-4">
                  <Users className="w-4 h-4 mr-2 text-gray-400" />
                  <span>Team Size: {project.teamSize}</span>
                </div>
              </div>

              <div className="absolute right-10 p-2 rounded-lg">
                <button
                  className="apply-button"
                  onClick={() => {
                    setIsSeeApplications(!isSeeApplications);
                  }}
                >
                  <div>
                    <div>
                      <div>
                        {isSeeApplications
                          ? "Hide Applications"
                          : "See Applications"}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {isSeeApplications && (
            <div className="py-4 w-full">
              <h1 className="text-center mb-4 text-lg">Applicants</h1>
              {applicants.map((applicant, index) => (
                <ApplicantAccordion key={index} applicant={applicant} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyProjectCard;
