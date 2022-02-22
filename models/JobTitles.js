const mongoose = require("mongoose");

const JobTitleSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    require: [true, "Please add a job title"],
  },
});

module.exports = mongoose.model("JobTitle", JobTitleSchema);
