"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Answer.belongsTo(models.Submission);
      Answer.belongsTo(models.Question);
    }
  }
  Answer.init(
    {
      submissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "SubmissionId is required",
          },
          notEmpty: {
            msg: "SubmissionId is required",
          },
        },
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "QuestionId is required",
          },
          notEmpty: {
            msg: "QuestionId is required",
          },
        },
      },
      userAnswer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserAnswer is required",
          },
          notEmpty: {
            msg: "UserAnswer is required",
          },
        },
      },
      isCorrect: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Answer",
    }
  );
  return Answer;
};
