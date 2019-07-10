'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Categories', {
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
			availability: {
				allowNull: false,
				defaultValue: true,
				type: Sequelize.BOOLEAN
			},
			level: {
				allowNull: false,
				defaultValue: 0,
				type: Sequelize.INTEGER
			},
			parent_name: {
				type: Sequelize.STRING
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
		return queryInterface.dropTable('Categories');
	}
};