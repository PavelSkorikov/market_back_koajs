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
				validate: {
					notEmpty: true,
					isAlpha: true,
					len: [2,50]
				}
			},
			description: {
				type: Sequelize.STRING,
				validate: {
					len: [2,250]
				}
			},
			availability: {
				allowNull: false,
				type: Sequelize.STRING
			},
			level: {
				allowNull: true,
				type: Sequelize.INTEGER
			},
			parent_name: {
				type: Sequelize.STRING
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Categories');
	}
};