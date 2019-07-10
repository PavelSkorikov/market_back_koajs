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
        unique: true
      },
      description: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.FLOAT,
        validate: {
          isNumeric: true,
          len: [2,50]
        }
      },
      availability: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      count: {
        allowNull: false,
        defaultValue: 0,
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