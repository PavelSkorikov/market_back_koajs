const
	Company = require("../models").Company,
	User = require("../models").User,
	Category = require("../models").Category,
	Product = require("../models").Product;

//метод возвращающий количество элементов из баз данных
exports.countItems = async function(ctx) {
	try {
		let count = {};
		await Company.count().then(c => {
			count.company = c;
		});
		await User.count().then(c => {
			count.user = c;
		});
		await Category.count().then(c => {
			count.category = c;
		});
		await Product.count().then(c => {
			count.product = c;
		});
		ctx.body = count;
		ctx.status = 200;
	}
	catch (err) {
		ctx.status = 500;
	}
};