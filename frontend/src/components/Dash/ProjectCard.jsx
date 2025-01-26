import React, { useEffect, useState } from "react";
import { User, Calendar, List, Users } from "lucide-react";
import axios from "axios";

function ProjectCard({ project, userData }) {
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    // console.log(userData);
    // Check if the user has already applied to the project
    if (userData.appliedProjects?.includes(project._id)) {
      setHasApplied(true);
    }
  }, [userData, project._id]);

  const handleApply = async (projectId) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("Unauthorized. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        `https://api-backend-projectpal-6gsq.onrender.com/api/v1/auth/join-project/${projectId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message || "Applied to project successfully!");
      setHasApplied(true); // Update the state to reflect the application
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      alert(
        error.response?.data?.message ||
          "An error occurred while applying to the project."
      );
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div
        className={`text-white text-md uppercase px-4 py-2 font-semibold ${
          project.stage === "Building MVP"
            ? "bg-red-500"
            : project.stage === "Raising Funds"
            ? "bg-green-500"
            : project.stage === "Brainstorming Ideas"
            ? "bg-yellow-500"
            : project.stage === "Scaling Up"
            ? "bg-teal-500"
            : project.stage === "Market Fit"
            ? "bg-indigo-500"
            : "bg-purple-500"
        }`}
      >
        {project.stage}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{project.projectName}</h3>
        <p className="text-gray-400 text-sm mb-4">{project.description}</p>
        <div className="flex items-center justify-between pr-30 relative">
          <div className="">
            <div className="flex items-center text-sm mb-2">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span>Posted: {project.createdAt}</span>
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
            {hasApplied ? (
              <div className="text-green-500 font-semibold">Applied</div>
            ) : (
              <button
                className="apply-button"
                onClick={() => handleApply(project._id)}
              >
                <div>
                  <div>
                    <div>Apply Now</div>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
