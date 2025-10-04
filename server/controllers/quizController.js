const { Quiz, Question } = require("../models/index");

class quizController {
  static async getQuizzes(req, res, next) {
    try {
      const quiz = await Quiz.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.status(200).json(quiz);
    } catch (error) {
      next(error);
    }
  }

  static async getQuizzesById(req, res, next) {
    try {
      const { id } = req.params;

      const quiz = await Quiz.findOne({
        where: { id: id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!quiz) throw { name: "Not Found", message: "Quiz not found" };

      res.status(200).json(quiz);
    } catch (error) {
      next(error);
    }
  }

  static async getQuizzesQuestion(req, res, next) {
    try {
      const { id } = req.params;

      const quizQuestion = await Quiz.findOne({
        where: { id: id },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Question,
          attributes: {
            exclude: ["correctAnswer", "createdAt", "updatedAt"],
          },
        },
      });

      if (!quizQuestion)
        throw { name: "Not Found", message: "Quiz Question not found" };

      res.status(200).json(quizQuestion);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = quizController;
