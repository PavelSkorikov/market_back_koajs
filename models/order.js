const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:1@localhost:5432/market');

const Order = db.define('order', {
		num_product: {
			type: Sequelize.INTEGER,
			allowNull: false,
			unique: false,
		},
		price_product: {
			type: Sequelize.FLOAT,
			allowNull: false,
			unique: false,
		},
		price_order: {
			type: Sequelize.FLOAT,
			allowNull: false,
			unique: false,
		},
		status: {
			type: Sequelize.STRING,
			allowNull: true,
			unique: false,
		},
		comment: {
			type: Sequelize.TEXT,
			allowNull: true,
			unique: false,
		},
	location: {
		type: Sequelize.STRING,
		allowNull: true,
		unique: false,
	}
	}
);

db.sync();
module.exports = {
	db,
	Order
};