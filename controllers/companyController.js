const Company = require("../models").Company;

//метод возвращающий количество компаний в базе
exports.countCompanies = async function(ctx) {
	try {
		await Company.count().then(c => {
			console.log(c);
			ctx.body = c;
		});
		ctx.status = 200;
	}
	catch (err) {
		ctx.status = 500;
	}
};

//добавляем компанию и возвращаем имя и описание новой компании
exports.addCompany = async function (ctx) {
	let companyName = await ctx.request.body.name;
	let companyDescription = await ctx.request.body.description;
	try {
		await Company.create({ name: companyName, description: companyDescription });
		ctx.status = 200;
	}
	catch (err) {
		console.log('error write to base');
		ctx.status = 500;
	}

};

//возвращаем все компании из базы
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

// удаляем компанию по заданному id
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

// изменяем в базе компанию на значения пришедшие в запросе
exports.putCompany = async function (ctx) {
	let companyId = await ctx.request.body.id;
	let companyName = await ctx.request.body.name;
	let companyDescription = await ctx.request.body.description;
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