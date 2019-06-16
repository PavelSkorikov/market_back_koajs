const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:1@localhost:5432/market');
const bcrypt = require('bcrypt-nodejs');

const User = db.define('user', {
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		group: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: false,
		},
		contacts: {
			type: Sequelize.JSON,
			allowNull: true,
			unique: true,
		},
		status: {
			type: Sequelize.STRING,
			allowNull: true,
			unique: false,
		},
	discount: {
			type: Sequelize.INTEGER,
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

User.beforeCreate((user, options) => {
	const salt = bcrypt.genSaltSync(10);
	user.password = bcrypt.hashSync(user.password, salt);
});
db.sync();

module.exports = {
	db,
	User
};