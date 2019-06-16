const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:1@localhost:5432/market');
const { Order } = require('./order');
const { Product } = require('./product');

const Orderproduct = db.define('Orderproduct', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	}
	}
);

Order.belongsToMany(Product, {through: Orderproduct});
Product.belongsToMany(Order, {through: Orderproduct});
db.sync();

module.exports = {
	db,
	Orderproduct
};