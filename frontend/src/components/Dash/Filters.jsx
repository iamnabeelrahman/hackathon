import React from "react";

function Filters({ setIsMyProjects, isMyProjects, categoryFilter, teamSizeFilter, stageFilter, sortOption, setCategoryFilter, setTeamSizeFilter, setStageFilter, setSortOption }) {
  return (
    <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => setIsMyProjects(!isMyProjects)}
            className="px-4 py-2 bg-gray-800 cursor-pointer text-white border border-gray-700 rounded-md"
          >
            {isMyProjects ? "All Projects" : "My Projects"}
          </button>
          <select
            className="p-2 bg-gray-800 text-white border border-gray-700 rounded-md"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Software">Software</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Marketing">Marketing</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
          <select
            className="p-2 bg-gray-800 text-white border border-gray-700 rounded-md"
            value={teamSizeFilter}
            onChange={(e) => setTeamSizeFilter(e.target.value)}
          >
            <option value="">All Team Size</option>
            <option value="1-3">1-3</option>
            <option value="4-6">4-6</option>
            <option value="more than 6">more than 6</option>
          </select>
          <select
            className="p-2 bg-gray-800 text-white border border-gray-700 rounded-md"
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
          >
            <option value="">All Stages</option>
            <option value="Brainstorming Ideas">Brainstorming Ideas</option>
            <option value="Building MVP">Building MVP</option>
            <option value="Raising Funds">Raising Funds</option>
            <option value="Scaling the Product">Scaling the Product</option>
            <option value="Market Research">Market Research</option>
            <option value="Product Launch">Product Launch</option>
            <option value="Other">Other</option>
          </select>
          <select
            className="p-2 bg-gray-800 text-white border border-gray-700 rounded-md"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="date-asc">Date (Oldest First)</option>
            <option value="date-desc">Date (Newest First)</option>
          </select>
        </div>
  );
}

export default Filters;
