const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Candidate = require("../models/Candidate");

//@desc     Get all candidates
//@route    GET /candidates
//@access   Private
exports.getCandidates = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operator in
  queryStr = queryStr.replace(/\b(in)\b/g, (match) => `$${match}`);

  // Finding resource
  query = Candidate.find(JSON.parse(queryStr));

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-addedAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Candidate.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const candidates = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: candidates.length,
    pagination,
    data: candidates,
  });
});

//@desc     Get single candidate
//@route    GET /candidates/:id
//@access   Private
exports.getCandidate = asyncHandler(async (req, res, next) => {
  const candidate = await Candidate.findById(req.params.id);

  if (!candidate) {
    return next(
      new ErrorResponse(`Candidate not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: candidate });
});

//@desc     Create new candidate
//@route    POST /candidates
//@access   Private
exports.createCandidate = asyncHandler(async (req, res, next) => {
  const candidate = await Candidate.create(req.body);

  res.status(201).json({
    success: true,
    data: candidate,
  });
});

//@desc     Update candidate
//@route    PUT /candidates/:id
//@access   Private
exports.updateCandidate = asyncHandler(async (req, res, next) => {
  const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!candidate) {
    return next(
      new ErrorResponse(`Candidate not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: candidate });
});

//@desc     Delete candidate
//@route    DELETE /candidates/:id
//@access   Private
exports.deleteCandidate = asyncHandler(async (req, res, next) => {
  const candidate = await Candidate.findByIdAndDelete(req.params.id);

  if (!candidate) {
    return next(
      new ErrorResponse(`Candidate not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
