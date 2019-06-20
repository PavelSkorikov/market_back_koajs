const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:1@localhost:5432/market');
const { User } = require('./user');

const Contact = db.define('contact', {
		country: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: false,
		},
		region: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: false,
		},
		town: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: false,
		},
		index: {
			type: Sequelize.STRING,
			allowNull: true,
			unique: false,
		},
		phone: {
			type: Sequelize.STRING,
			allowNull: true,
			unique: true,
		},
		name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: false,
		},
		lastname: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: false,
		}
	}
);

Contact.hasOne(User, { onDelete: "cascade"});
db.sync();

module.exports = {
	db,
	Contact
};