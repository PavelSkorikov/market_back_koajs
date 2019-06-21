'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          notEmpty: true,
          len: [2,20]
        }
      },
      region: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          notEmpty: true,
          len: [2,20]
        }
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          notEmpty: true,
          len: [2,20]
        }
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2,100]
        }
      },
      iso: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isNumeric: true,
          notEmpty: true,
          len: [2,10]
        }
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: ["^\d\(\d{3}\)\d+$"],
          notEmpty: true,
          len: [2,20]
        }
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlpha: true,
          len: [2,50]
        }
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlpha: true,
          len: [2,50]
        }
      },
      patronymic: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlpha: true,
          len: [2,50]
        }
      },
      UserId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
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
    return queryInterface.dropTable('Contacts');
  }
};