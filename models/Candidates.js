const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "PLease add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  observations: {
    type: String,
    maxlength: [500, "Observations can not be more than 500 characters"],
  },
  linkedin: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
  },
  phone: {
    type: String,
    unique: true,
    maxlength: [20, "Phone number can not be longer than 20 characters"],
  },
  email: {
    type: String,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please add a valid email",
    ],
  },
  jobTitle: {
    type: String,
    required: [true, "PLease add a job title"],
    maxlength: [50, "Job can not be more than 50 characters"],
  },
  addedAt: {
    type: Date,
    default: Date.now(),
  },
  level: {
    type: String,
    required: [true, "Please add a level"],
    maxlength: [50, "Level can not be more than 50 characters"],
  },
  location: {
    type: String,
    required: [true, "Please add a location"],
    maxlength: [50, "Location can not be more than 50 characters"],
  },
  source: {
    type: String,
    maxlength: [50, "Source can not be more than 50 characters"],
  },
  status: {
    type: String,
    maxlength: [50, "Status can not be more than 50 characters"],
  },
  stage1: {
    type: String,
    required: [true, "Please add a name for the interviewer from stage 1"],
    maxlength: [50, "Stage 1 can not be more than 50 characters"],
  },
  stage2: {
    type: String,
    maxlength: [50, "Stage 2 can not be more than 50 characters"],
  },
  stage3: {
    type: String,
    maxlength: [50, "Stage 3 can not be more than 50 characters"],
  },
});

module.exports = mongoose.model("Candidate", CandidateSchema);
