const express = require("express");
const submissionController = require("../controllers/submissionController");
const submission = express.Router();

submission.get("/", submissionController.getSubmission);
submission.get("/:id", submissionController.getSubmissionById);
submission.patch("/:id/answers", submissionController.updateSubmissionAnswer);
submission.post("/:id/finish", submissionController.finishSubmission);

module.exports = submission;
