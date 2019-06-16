const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:1@localhost:5432/market');
const { Image } = require('./image');

const Product = db.define('product', {
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
		model: {
			type: Sequelize.STRING,
			allowNull: true,
			unique: false,
		},
		price: {
			type: Sequelize.FLOAT,
			allowNull: false,
			unique: false,
		},
		availability: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: false,
		},
		count: {
			type: Sequelize.INTEGER,
			allowNull: true,
			unique: false,
		}
	},
);
Product.hasMany(Image, { onDelete: "cascade" });

db.sync();

module.exports = {
	db,
	Product
};