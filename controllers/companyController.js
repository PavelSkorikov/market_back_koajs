
const Company = require("../models").Company;

exports.addCompany = async function (ctx) {
	var companyName = await ctx.request.body.name;
	var companyDescription = await ctx.request.body.description;
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