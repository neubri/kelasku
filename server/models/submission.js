"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association
      Submission.belongsTo(models.User, { foreignKey: "userId" });
      Submission.hasMany(models.Answer, { foreignKey: "submissionId" });
      Submission.belongsTo(models.Quiz, { foreignKey: "quizId" });
    }
  }
  Submission.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserId is required",
          },
          notEmpty: {
            msg: "UserId is required",
          },
        },
      },
      quizId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "QuizId is required",
          },
          notEmpty: {
            msg: "QuizId is required",
          },
        },
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      startedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "StartedAt is required",
          },
          notEmpty: {
            msg: "StartedAt is required",
          },
        },
      },
      finishedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Submission",
    }
  );
  return Submission;
};
