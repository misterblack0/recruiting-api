const mongoose = require("mongoose");

const JobTitleSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a job title"],
    maxlength: [50, "Job title can not be more than 50 characters"],
  },
  candidates: {
    type: Number,
  },
  addedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("JobTitle", JobTitleSchema);
