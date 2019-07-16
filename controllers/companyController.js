
const Company = require("../models").Company;

exports.addCompany = async function (ctx) {
	let companyName = await ctx.request.body.name;
	let companyDescription = await ctx.request.body.description;
	console.log(companyName);
	console.log(companyDescription);
	try {
		await Company.create({ name: companyName, description: companyDescription });
		ctx.status = 200;
	}
	catch (err) {
		console.log('error write to base');
		ctx.status = 500;
	}

};
exports.getCompany = async function (ctx) {
	try {
		await Company.findAll().then(companies => {
			ctx.body = companies;
		});
		ctx.status = 200;
	}
	catch (err) {
		ctx.status = 500;
	}
};
exports.delCompany = async function (ctx) {
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
exports.putCompany = async function (ctx) {
	let companyId = await ctx.request.body.id;
	let companyName = await ctx.request.body.name;
	let companyDescription = await ctx.request.body.description;
	console.log(companyId);
	console.log(companyName);
	console.log(companyDescription);

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