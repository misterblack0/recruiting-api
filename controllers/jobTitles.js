const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const JobTitle = require("../models/JobTitle");

//@desc     Get job titles
//@route    GET /jobTitles
//@access   Private
exports.getJobTitles = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operator in
  queryStr = queryStr.replace(/\b(in)\b/g, (match) => `$${match}`);

  // Finding resource
  query = JobTitle.find(JSON.parse(queryStr));

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-addedAt");
  }

  // Executing query
  const jobTitles = await query;

  res.status(200).json({
    success: true,
    count: jobTitles.length,
    // pagination,
    data: jobTitles,
  });
});

//@desc     Get single job title
//@route    GET /jobTitles/:id
//@access   Private
exports.getJobTitle = asyncHandler(async (req, res, next) => {
  const jobTitle = await JobTitle.findById(req.params.id);

  if (!jobTitle) {
    return next(
      new ErrorResponse(`Job title not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: jobTitle });
});

//@desc     Create new job title
//@route    POST /jobTitles
//@access   Private
exports.createJobTitle = asyncHandler(async (req, res, next) => {
  const jobTitle = await JobTitle.create(req.body);

  res.status(201).json({
    success: true,
    data: jobTitle,
  });
});

//@desc     Update job title
//@route    PUT /jobTitles/:id
//@access   Private
exports.updateJobTitle = asyncHandler(async (req, res, next) => {
  const jobTitle = await JobTitle.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!jobTitle) {
    return next(
      new ErrorResponse(`Job title not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: jobTitle });
});

//@desc     Delete job title
//@route    DELETE /jobTitles/:id
//@access   Private
exports.deleteJobTitle = asyncHandler(async (req, res, next) => {
  const jobTitle = await JobTitle.findByIdAndDelete(req.params.id);

  if (!jobTitle) {
    return next(
      new ErrorResponse(`Job title not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
