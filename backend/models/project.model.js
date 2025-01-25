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
    },
    views: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      //cloudinary URL
      type: String,
    },
    isOnGoing: {
      type: Boolean,
      default: true,
    },
    timeLeft: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Video = new mongoose.model("Video", videoSchema);
module.exports = { Video };
