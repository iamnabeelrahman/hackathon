const {Project} = require("../models/project.model.js");
const {User} = require("../models/users.model.js");
const { projectSchema } = require("../models/zod.models.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");



const createProject = async (req, res) => {
  try {
    const { projectName, description, deadline, category, location, stage, teamSize } = req.body;
    const userId = req.user._id;
    const parsedData =  projectSchema.safeParse({ projectName, description, deadline, category, location, stage, teamSize });

    // if (!parsedData.success) {
    //   return res.status(403).json({
    //     message: "invalid input",
    //   });
    // }

    const { buffer, originalname } = req?.file || {}; 
    const fileName = originalname ? `${Date.now()}-${originalname}` : null; 
    
    let result = null; 
    
    // Check if file exists before attempting to upload
    if (buffer && originalname) {
      result = await uploadOnCloudinary(buffer, fileName);
    }

    const newProject = await Project.create({
      projectName,
      description,
      thumbnail: result?.url || "https://codingireland.blob.core.windows.net/images/steps%5Cpiq596_steps_xvv985_brainstorm-2.png",
      deadline,
      owner: userId,
      category: category || "others",
      location: location || "remote",
      stage: stage || "no stage provided",
      // tags: [],
      teamSize,
    });

    // Add the project to the user's createdProjects array
    await User.findByIdAndUpdate(userId, {
      $push: { createdProjects: newProject._id },
    });

    res.status(201).json({ success: true, project: newProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default page and limit

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      populate: [
        { path: "owner", select: "name email" },
        { path: "likes", select: "name" },
        { path: "comments.user", select: "name email" },
        { path: "teamMembers", select: "name email" },
      ],
    };

    // Use the paginate method
    const projects = await Project.aggregatePaginate(Project.aggregate(), options);

    if (!projects.docs.length) {
      return res.status(404).json({ success: false, message: "No projects found" });
    }

    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = { createProject, getAllProjects };