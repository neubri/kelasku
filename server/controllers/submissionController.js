const { Submission, Question, Answer, Quiz } = require("../models/index");

class submissionController {
  static async updateSubmissionAnswer(req, res, next) {
    try {
      const { id } = req.params; //submission id
      const { userId } = req.user; //user id
      const { questionId, userAnswer } = req.body;

      //check submission is valid
      const submission = await Submission.findOne({ where: { id, userId } });
      if (!submission)
        throw { name: "Not Found", message: "Submission not found" };

      //forbidden validation
      if (submission.userId !== userId) {
        throw { name: "Forbidden", message: "You are not authorized" };
      }

      //check question is valid
      const question = await Question.findByPk(questionId);
      if (!question) throw { name: "Not Found", message: "Question not found" };

      //check the answer true/not
      const isCorrect = question.correctAnswer === userAnswer;

      //check if user already answer question
      let answer = await Answer.findOne({
        where: { submissionId: id, questionId },
      });

      //if user already answer (update answer)
      if (answer) {
        await answer.update({ userAnswer, isCorrect });
      } else {
        //if user not yet answer (create new answer)
        answer = await Answer.create({
          submissionId: id,
          questionId,
          userAnswer,
          isCorrect,
        });
      }

      res.status(200).json({
        id: answer.id,
        submissionId: answer.submissionId,
        questionId: answer.questionId,
        userAnswer: answer.userAnswer,
        isCorrect: answer.isCorrect,
      });
    } catch (error) {
      next(error);
    }
  }

  static async finishSubmission(req, res, next) {
    try {
      const { id } = req.params; //submission id
      const { userId } = req.user; //user id

      //check if submission valid
      const submission = await Submission.findOne({ where: { id, userId } });
      if (!submission)
        throw { name: "Not Found", message: "Submission not found" };

      //forbidden validation
      if (submission.userId !== userId) {
        throw { name: "Forbidden", message: "You are not authorized" };
      }

      //check if submission already finished or not
      if (submission.finishedAt)
        throw { name: "Bad Request", message: "Submission already finished" };

      //get all user anwer
      const answer = await Answer.findAll({ where: { submissionId: id } });

      //check is anwer is there
      if (answer.length === 0)
        throw { name: "Bad Request", message: "No aswers found" };

      //check total correct answer user
      const totalCorrect = answer.filter((a) => a.isCorrect).length;

      //check total question
      const totalQuestion = await Question.count({
        where: { quizId: submission.quizId },
      });

      //count total score user
      const score = Math.round((totalCorrect / totalQuestion) * 100);

      //update submission user score and finish date
      await submission.update({
        score,
        finishedAt: new Date(),
      });

      res.status(200).json({
        id: submission.id,
        quizId: submission.quizId,
        userId: submission.userId,
        score,
        startedAt: submission.startedAt,
        finishedAt: submission.finishedAt,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSubmission(req, res, next) {
    try {
      const { userId } = req.user; //user id

      const submission = await Submission.findAll({
        where: { userId },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Quiz,
          attributes: ["title"], //only get title
        },
        order: [["createdAt", "DESC"]], //sort by latest created submission
      });

      res.status(200).json(submission);
    } catch (error) {
      next(error);
    }
  }

  static async getSubmissionById(req, res, next) {
    try {
      const { id } = req.params;
      const { userId } = req.user;

      // Single query with complex joins - Most optimal!
      const submission = await Submission.findOne({
        where: { id },
        attributes: [
          "id",
          "userId",
          "quizId",
          "score",
          "startedAt",
          "finishedAt",
        ],
        include: [
          {
            model: Quiz,
            attributes: ["id"],
            include: {
              model: Question,
              attributes: [
                "id",
                "text",
                "imageUrl",
                "optionA",
                "optionB",
                "optionC",
                "optionD",
                "correctAnswer",
                "explanation",
              ],
              include: {
                model: Answer,
                attributes: ["userAnswer", "isCorrect"],
                where: { submissionId: id },
                required: false, // LEFT JOIN to include questions without answers
              },
            },
          },
        ],
      });

      if (!submission)
        throw { name: "Not Found", message: "Submission not found" };

      // Forbidden validation
      if (submission.userId !== userId) {
        throw { name: "Forbidden", message: "You are not authorized" };
      }

      // Transform data for cleaner response
      const questions = submission.Quiz.Questions.map((question) => ({
        id: question.id,
        text: question.text,
        imageUrl: question.imageUrl,
        optionA: question.optionA,
        optionB: question.optionB,
        optionC: question.optionC,
        optionD: question.optionD,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        userAnswer: question.Answers[0]?.userAnswer || null,
        isCorrect: question.Answers[0]?.isCorrect || false,
      }));

      res.status(200).json({
        id: submission.id,
        userId: submission.userId,
        quizId: submission.quizId,
        score: submission.score,
        startedAt: submission.startedAt,
        finishedAt: submission.finishedAt,
        questions: questions,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = submissionController;
