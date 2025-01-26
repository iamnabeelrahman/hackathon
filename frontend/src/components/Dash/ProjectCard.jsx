import React, { useEffect } from "react";
import { User, Calendar, List, Users } from "lucide-react";

function ProjectCard({ project }) {
  useEffect(() => {
    console.log("project", project);
  }, [project]);
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
            {/* <div className="flex items-center text-sm mb-2">
              <User className="w-4 h-4 mr-2 text-gray-400" />
              <span>Project Manager: {project.projectManager}</span>
            </div> */}
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
            <button className="apply-button">
              <div>
                <div>
                  <div>Apply Now</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
