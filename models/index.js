const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:1@localhost:5432/market');
const { Orderproduct } = require('./order-product');
const { Category } = require('./category');
const { Manufacturer} = require('./manufacturer');
const { User } = require('./user');

db.sync({ force: true });
