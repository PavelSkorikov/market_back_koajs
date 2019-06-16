const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:1@localhost:5432/market');
const { Product } = require('./product');

const Category = db.define('category', {
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
		image: {
			type: Sequelize.STRING,
			allowNull: true,
			unique: true,
		},
		availability: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: false,
		},
		tree: {
			type: Sequelize.JSON,
			allowNull: false,
			unique: false,
		},
		seo: {
			type: Sequelize.JSON,
			allowNull: true,
			unique: false,
		},

	},
);
Category.hasMany(Product);
db.sync();

module.exports = {
	db,
	Category
};