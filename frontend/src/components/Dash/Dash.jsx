import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import NewProjectModal from "./NewProjectModal";
import MyProjectCard from "./MyProjectCard";
import axios from "axios";
import Filters from "./Filters";

const FeaturedProjects = ({ userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMyProjects, setIsMyProjects] = useState(false);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [teamSizeFilter, setTeamSizeFilter] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch projects from backend
  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api-backend-projectpal-6gsq.onrender.com/api/v1/auth/get-project"
      );
      const fetchedProjects = response.data.projects.docs;
      setProjects(fetchedProjects);
      setFilteredProjects(fetchedProjects);
      // console.log(response.data.message || "Fetched projects successfully!");
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter projects when category, team size, stage, or search query changes
  useEffect(() => {
    let filtered = projects;

    if (categoryFilter) {
      filtered = filtered.filter(
        (project) =>
          project.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (teamSizeFilter) {
      filtered = filtered.filter((project) => {
        const teamSize = project.teamSize;
        if (teamSizeFilter === "1-3") {
          return teamSize >= 1 && teamSize <= 3;
        } else if (teamSizeFilter === "4-6") {
          return teamSize >= 4 && teamSize <= 6;
        } else if (teamSizeFilter === "more than 6") {
          return teamSize > 6;
        }
        return true;
      });
    }

    if (stageFilter) {
      filtered = filtered.filter(
        (project) => project.stage.toLowerCase() === stageFilter.toLowerCase()
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.projectName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOption) {
      filtered = filtered.sort((a, b) => {
        if (sortOption === "name-asc") {
          return a.projectName.localeCompare(b.projectName);
        } else if (sortOption === "name-desc") {
          return b.projectName.localeCompare(a.projectName);
        } else if (sortOption === "date-asc") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        } else if (sortOption === "date-desc") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
      });
    }

    setFilteredProjects(filtered);
  }, [
    categoryFilter,
    teamSizeFilter,
    stageFilter,
    sortOption,
    searchQuery,
    projects,
  ]);

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter user's created projects
  const myProjects = projects.filter((project) =>
    userData.createdProjects?.includes(project._id)
  );

  return (
    <>
      <div className="bg-black text-white p-6 min-h-screen">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <input
            className="w-1/3 p-2 text-white bg-gray-800 border border-gray-700 rounded-md"
            placeholder="Search for a specific project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button className="NewProjectBtn" onClick={openModal}>
            <div className="sign">+</div>
            <div className="text">Create Project</div>
          </button>
        </div>

        <Filters
          setCategoryFilter={setCategoryFilter}
          setTeamSizeFilter={setTeamSizeFilter}
          setStageFilter={setStageFilter}
          setSortOption={setSortOption}
          isMyProjects={isMyProjects}
          setIsMyProjects={setIsMyProjects}
          categoryFilter={categoryFilter}
          teamSizeFilter={teamSizeFilter}
          stageFilter={stageFilter}
          sortOption={sortOption}
        />

        {/* Projects Section */}
        <h2 className="text-2xl font-bold mb-4 mt-6">
          {isMyProjects ? "My Projects" : "All Projects"}
        </h2>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : (
          <div
            className={` ${
              isMyProjects ? "flex mt-6 flex-col items-center gap-3" : "grid grid-cols-1 md:grid-cols-3 gap-6"
            }`}
          >
            {isMyProjects ? (
              myProjects.length > 0 ? (
                myProjects.map((project) => (
                  <MyProjectCard key={project._id} project={project} />
                ))
              ) : (
                <p>No projects found.</p>
              )
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} userData={userData} />
              ))
            ) : (
              <p>No projects found.</p>
            )}
          </div>
        )}
      </div>
      <NewProjectModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default FeaturedProjects;
