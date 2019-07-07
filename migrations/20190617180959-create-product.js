'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlphanumeric: true,
          len: [2,250]
        }
      },
      description: {
        type: Sequelize.STRING,
        validate: {
          len: [5,250]
        }
      },
      model: {
        type: Sequelize.STRING,
        validate: {
          isAlphanumeric: true,
          len: [2,250]
        }
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT,
        validate: {
          isNumeric: true,
          len: [2,50]
        }
      },
      availability: {
        allowNull: false,
        type: Sequelize.STRING
      },
      count: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      CompanyId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Companies',
          key: 'id'
        }
      },
      CategoryId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Categories',
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
    return queryInterface.dropTable('Products');
  }
};