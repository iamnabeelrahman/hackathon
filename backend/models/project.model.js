const mongoose = require("mongoose");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    thumbnail: {
      //cloudinary URL
      type: String,
    },
    stage: {
      type: String,
      required: true,
    },
    deadline: {
      type: Number,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    teamSize: {
      type: Number,
      required: true,
    },
    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    // tags: [
    //   {
    //     type: String,
    //   },
    // ],
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },  
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ]
  },
  { timestamps: true }
);

projectSchema.plugin(mongooseAggregatePaginate);

const Project = new mongoose.model("Project", projectSchema);
module.exports = { Project };
