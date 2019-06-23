'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Groups', 'createdAt', { transaction: t }),
        queryInterface.removeColumn('Groups', 'updatedAt', { transaction: t })
      ])
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Groups', 'createdAt', { transaction: t }),
        queryInterface.removeColumn('Groups', 'updatedAt', { transaction: t })
      ])
    })
  }
};