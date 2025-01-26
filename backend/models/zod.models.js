const zod = require("zod")

const registerSchema = zod.object({
    username: zod.string(),
    email: zod.string(),
    fullName: zod.string(),
    password: zod.string(),
})
const loginSchema = zod.object({
    username: zod.string(),
    email: zod.string(),
    fullName: zod.string(),
})

const projectSchema = zod.object({
    projectName: zod.string().min(1, { message: "Project name is required" }),
    description: zod.string().min(1, { message: "Project description is required" }),
    thumbnail: zod.string(), 
    deadline: zod.number(), 
    owner: zod.string(),
    teamMembers: zod.array(zod.string()),
    location: zod.string(),
    category: zod.string(),
    stage: zod.string(),
    teamSize: zod.number().min(1, { message: "Team size is needed" }),
})


module.exports = { registerSchema, loginSchema, projectSchema };

//resume, pone, applicants