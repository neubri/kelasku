const express = require("express");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const router = express.Router();

//public routes
router.use("/", require("./userRouter"));

//auth routes
router.use(authentication);
router.use("/quizzes", require("./quizzesRouter"));
router.use("/submissions", require("./submissionRouter"));
router.use(errorHandler);

module.exports = router;
