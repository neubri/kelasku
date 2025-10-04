"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Quiz.hasMany(models.Question, { foreignKey: "quizId" });
      Quiz.hasMany(models.Submission, { foreignKey: "quizId" });
    }
  }
  Quiz.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title is required",
          },
          notEmpty: {
            msg: "Title is required",
          },
        },
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Subject is required",
          },
          notEmpty: {
            msg: "Subject is required",
          },
        },
      },
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Quiz",
    }
  );
  return Quiz;
};
