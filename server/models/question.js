"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.Quiz);
      Question.hasMany(models.Answer);
    }
  }
  Question.init(
    {
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
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Text is required",
          },
          notEmpty: {
            msg: "Text is required",
          },
        },
      },
      optionA: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Option A is required",
          },
          notEmpty: {
            msg: "Option A is required",
          },
        },
      },
      optionB: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Option B is required",
          },
          notEmpty: {
            msg: "Option B is required",
          },
        },
      },
      optionC: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Option C is required",
          },
          notEmpty: {
            msg: "Option C is required",
          },
        },
      },
      optionD: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Option D is required",
          },
          notEmpty: {
            msg: "Option D is required",
          },
        },
      },
      correctAnswer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Correct Answer is required",
          },
          notEmpty: {
            msg: "Correct Answer is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
