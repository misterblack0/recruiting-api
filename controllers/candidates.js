//@desc     Get all candidates
//@route    GET /candidates
//@access   Private
exports.getCandidates = (req, res, next) => {
  res.send("all candidates");
};

//@desc     Get single candidate
//@route    GET /candidates/:id
//@access   Private
exports.getCandidate = (req, res, next) => {
  res.send("get candidate");
};

//@desc     Create new candidate
//@route    POST /candidates
//@access   Private
exports.createCandidate = (req, res, next) => {
  res.send("create candidate");
};

//@desc     Update candidate
//@route    PUT /candidates/:id
//@access   Private
exports.updateCandidate = (req, res, next) => {
  res.send("put candidate");
};

//@desc     Delete candidate
//@route    DELETE /candidates/:id
//@access   Private
exports.deleteCandidate = (req, res, next) => {
  res.send("delete candidate");
};
