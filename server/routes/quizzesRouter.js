const express = require("express");
const quizController = require("../controllers/quizController");
const quiz = express.Router();

quiz.get("/", quizController.getQuizzes);
quiz.get("/:id", quizController.getQuizzesById);
quiz.get("/:id/questions", quizController.getQuizzesQuestion);
quiz.post("/:quizId/submissions", quizController.createSubmission);

module.exports = quiz;
