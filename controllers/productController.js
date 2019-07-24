
const Product = require("../models").Product;

exports.addProduct = async function (ctx) {
	let productName = await ctx.request.body.name;
	let productDescription = await ctx.request.body.description;
	try {
		await Product.create({ name: productName, description: productDescription });
		ctx.status = 200;
	}
	catch (err) {
		console.log('error write to base');
		ctx.status = 500;
	}

};
exports.getProduct = async function (ctx) {
	try {
		await Product.findAll().then(products => {
			ctx.body = products;
		});
		ctx.status = 200;
	}
	catch (err) {
		ctx.status = 500;
	}
};
exports.delProduct = async function (ctx) {
	let companyId = ctx.request.query.id;
	try {
		await Company.destroy({
			where: {
				id: companyId
			}
		});
		ctx.status = 204;
	}
	catch (err) {
		ctx.status = 500;
	}
};
exports.putProduct = async function (ctx) {
	let companyId = await ctx.request.body.id;
	let companyName = await ctx.request.body.name;
	let companyDescription = await ctx.request.body.description;
	console.log(ctx.request.body);

	try {
		await Company.update(
			{name: companyName, description: companyDescription },
			{
				where: {
					id: companyId
				}
			});
		ctx.status = 204;
	}
	catch (err) {
		ctx.status = 500;
	}
};