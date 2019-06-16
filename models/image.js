const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:1@localhost:5432/market');

const Image = db.define('image', {
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
	Image
};