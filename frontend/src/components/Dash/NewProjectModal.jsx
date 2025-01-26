import React, { useState } from "react";
import {
  Clipboard,
  User,
  Calendar,
  Target,
  TrendingUp,
  BookText,
  ChartColumnStacked,
  UsersRound,
  UserRound,
  MapPin,
} from "lucide-react";

const NewProjectModal = ({ isOpen, onClose }) => {
  const [project, setProject] = useState({
    projectName: "",
    stage: "",
    description: "",
    category: "",
    teamSize: "",

    deadline: "",
    location: "",
    // postedDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: name === "teamSize" ? Number(value) : value,
    }));
  };

  // Function to post the project data to the backend
  const postProjectData = async (e) => {
    e.preventDefault();
    try {
      const token =
        localStorage.getItem("accessToken") ||
        document.cookie.replace(
          /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
          "$1"
        );

      // If token does not exist, handle the case (redirect to login, show error, etc.)
      if (!token) {
        alert("Unauthorized. Please log in.");
        return;
      }

      const response = await fetch(
        "https://api-backend-projectpal-6gsq.onrender.com/api/v1/auth/post-project",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Adding the token to the headers
          },
          body: JSON.stringify(project),
        }
      );

      const result = await response.json();
      if (response.ok) {
        // console.log("Project posted successfully:", result);
        // Optionally reset form, close modal, etc.
        setProject({
          projectName: "",
          stage: "",
          description: "",
          category: "",
          teamSize: "",
          owner: "",
          deadline: "",
          location: "",
        });
        onClose(); // Close the modal after posting
        window.location.reload(); // Reload the page to see the new project
      } else {
        console.error("Error posting project:", result.message);
        alert("Error posting project: " + result.message);
      }
    } catch (error) {
      console.error("Error posting data:", error);
      alert("An error occurred while posting the project.");
    }
    // console.log(project);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        className="modal-content border border-gray-500 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 className="text-xl text-gray-300">Post a New Project</h3>
        </div>
        <form onSubmit={postProjectData}>
          <div className="input-group">
            <label htmlFor="projectName">
              <UserRound className="text-gray-300 mr-2" />
            </label>
            <input
              className="bg-gray-800 text-white border border-gray-700 rounded-md"
              type="text"
              name="projectName"
              id="projectName"
              value={project.projectName}
              onChange={handleChange}
              placeholder="Enter Project Name"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="stage" className="flex items-center">
              <TrendingUp className="text-gray-300 mr-2" />
            </label>
            <select
              className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 w-full"
              name="stage"
              id="stage"
              value={project.stage}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select the current stage of your project
              </option>
              <option value="Brainstorming Ideas">Brainstorming Ideas</option>
              <option value="Building MVP">Building MVP</option>
              <option value="Raising Funds">Raising Funds</option>
              <option value="Scaling the Product">Scaling the Product</option>
              <option value="Market Research">Market Research</option>
              <option value="Product Launch">Product Launch</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="input-group textarea-group">
            <label htmlFor="description">
              <BookText className="text-gray-300 mr-2" />
            </label>
            <textarea
              className="bg-gray-800 text-white border border-gray-700 rounded-md"
              type="text"
              name="description"
              id="description"
              value={project.description}
              onChange={handleChange}
              placeholder="Enter Project Description - Brifly let the user know about your project and your vision."
              rows="4"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="category">
              <ChartColumnStacked className="text-gray-300 mr-2" />
            </label>
            <select
              className="bg-gray-800 w-full text-white border border-gray-700 rounded-md px-3 py-2"
              name="category"
              id="category"
              value={project.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Project Category
              </option>
              <option value="Software">Software</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Marketing">Marketing</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="teamSize">
              <UsersRound className="text-gray-300 mr-2" />
            </label>
            <input
              className="bg-gray-800 text-white border border-gray-700 rounded-md"
              type="number"
              name="teamSize"
              id="teamSize"
              value={project.teamSize}
              onChange={handleChange}
              placeholder="Your Current Team Member's Count - Example., 6, 10, 15."
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="deadline">
              <User className="text-gray-300 mr-2" />
            </label>
            <input
              className="bg-gray-800 text-white border border-gray-700 rounded-md"
              type="number"
              name="deadline"
              id="deadline"
              value={project.deadline}
              onChange={handleChange}
              placeholder="Deadline in days"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="location">
              <MapPin className="text-gray-300 mr-2" />
            </label>
            <input
              className="bg-gray-800 text-white border border-gray-700 rounded-md"
              type="location"
              name="location"
              id="location"
              value={project.location}
              onChange={handleChange}
              placeholder="Location - Example., Remote, Hyderabad, Mumbai"
              required
            />
          </div>

          <div className="button-group">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;
