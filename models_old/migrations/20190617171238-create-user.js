'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
        validate: {
          isEmail: true
        },
      },
      password: {
        allowNull: false,
        unique: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      discount: {
        type: Sequelize.INTEGER
      },
      GroupId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Groups',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};