"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quizId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Quizzes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.TEXT,
      },
      optionA: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      optionB: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      optionC: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      optionD: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      explanation: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      correctAnswer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Questions");
  },
};
