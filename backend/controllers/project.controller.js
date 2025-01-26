const { Project } = require("../models/project.model.js");
const { User } = require("../models/users.model.js");
const { projectSchema } = require("../models/zod.models.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");

const createProject = async (req, res) => {
  try {
    const {
      projectName,
      description,
      deadline,
      category,
      location,
      stage,
      teamSize,
    } = req.body;
    const userId = req.user._id;
    const parsedData = projectSchema.safeParse({
      projectName,
      description,
      deadline,
      category,
      location,
      stage,
      teamSize,
    });

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
      thumbnail:
        result?.url ||
        "https://codingireland.blob.core.windows.net/images/steps%5Cpiq596_steps_xvv985_brainstorm-2.png",
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
    const projects = await Project.aggregatePaginate(
      Project.aggregate(),
      options
    );

    if (!projects.docs.length) {
      return res
        .status(404)
        .json({ success: false, message: "No projects found" });
    }

    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const joinProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user?._id; 

    // console.log("userId: ", userId);
    // console.log("projectId: ", projectId);

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    // console.log("found project: ", project);

    // Check if user has already applied
    if (project.applicants.some((applicant) => applicant.user.toString() === userId.toString())) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this project",
      });
    }

    // Check if the user has uploaded a resume
    const user = await User.findById(userId);
    if (!user.resume) {
      return res.status(400).json({
        success: false,
        message: "Please upload your resume to apply",
      });
    }

    // console.log("User: ", user);

    // Prepare the applicant details
    const applicantDetails = {
      user: userId,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profileImage: user.profileImage, // Assuming user has profileImage field
      resume: user.resume,
    };

    // console.log("Applicant details: ", applicantDetails);

    // Add applicant details to the applicants array
    project.applicants.push(applicantDetails);

    // Save the updated project
    await project.save();

    res.status(200).json({
      success: true,
      message: "Successfully applied for the project",
      project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while applying for the project",
    });
  }
};

module.exports = { createProject, getAllProjects, joinProject };
