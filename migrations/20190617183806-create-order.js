'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      count_products: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      price_products: {
        type: Sequelize.JSON
      },
      price_order: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.FLOAT
      },
      status: {
        allowNull: false,
        defaultValue: 'created',
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING,
        validate: {
          isAlphanumeric: true,
          len: [2,250]
        }
      },
      pyment_method: {
        allowNull: false,
        defaultValue: 'undefined',
        type: Sequelize.STRING
      },
      delivery_method: {
        allowNull: false,
        defaultValue: 'undfined',
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.UUID,
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
    return queryInterface.dropTable('Orders');
  }
};