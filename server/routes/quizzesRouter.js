const express = require("express");
const quizController = require("../controllers/quizController");
const quiz = express.Router();

quiz.get("/", quizController.getQuizzes);
quiz.get("/:id", quizController.getQuizzesById);
quiz.get("/:id/questions", quizController.getQuizzesQuestion);

module.exports = quiz;
