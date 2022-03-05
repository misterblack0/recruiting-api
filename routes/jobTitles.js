const express = require("express");
const {
  getJobTitles,
  getJobTitle,
  createJobTitle,
  updateJobTitle,
  deleteJobTitle,
} = require("../controllers/jobTitles");

const router = express.Router();

router.route("/jobTitles").get(getJobTitles).post(createJobTitle);

router
  .route("/jobTitles/:id")
  .get(getJobTitle)
  .put(updateJobTitle)
  .delete(deleteJobTitle);

module.exports = router;
