const { Quiz, Question, Submission } = require("../models/index");

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
            exclude: ["correctAnswer", "explanation", "createdAt", "updatedAt"],
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

  static async createSubmission(req, res, next) {
    try {
      const { quizId } = req.params;
      const { userId } = req.user;

      // check is quiz valid
      const quiz = await Quiz.findByPk(quizId);
      if (!quiz) throw { name: "Not Found", message: "Quiz not found" };

      //create submission
      const submission = await Submission.create({
        quizId,
        userId,
        startedAt: new Date(),
      });

      res.status(201).json({
        id: submission.id,
        quizId: submission.quizId,
        userId: submission.userId,
        score: submission.score,
        startedAt: submission.startedAt,
        finishedAt: submission.finishedAt,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = quizController;
