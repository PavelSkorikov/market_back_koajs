const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:1@localhost:5432/market');
const { Product } = require('./product');

const Manufacturer = db.define('manufacturer', {
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: Sequelize.STRING,
			allowNull: true,
			unique: false,
		},
		logo: {
			type: Sequelize.STRING,
			allowNull: true,
			unique: true,
		},
		number_goods: {
			type: Sequelize.INTEGER,
			allowNull: true,
			unique: false,
		},
	},
);
Manufacturer.hasMany(Product, { onDelete: "cascade" });
db.sync();

module.exports = {
	db,
	Manufacturer
};