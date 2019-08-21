const Category = require("../models").Category;

//создаем новую категорию
exports.addCategory = async function (ctx) {
	let categoryName = await ctx.request.body.name;
	let categoryDescription = await ctx.request.body.description;
	let categoryAvailability = await ctx.request.body.availability;
	let categoryParent_name = await ctx.request.body.parent_name;
	console.log(ctx.request.body);
	try {
		await Category.create(
			{ name: categoryName,
				description: categoryDescription,
				parent_name: categoryParent_name,
				availability: categoryAvailability
			}
			);
		ctx.status = 200;
	}
	catch (err) {
		console.log('error write to base');
		ctx.status = 500;
	}

};

//возвращаем все категории из базы данных
exports.getCategory = async function (ctx) {
	try {
		await Category.findAll().then(categories => {
			ctx.body = categories;
		});
		ctx.status = 200;
	}
	catch (err) {
		ctx.status = 500;
	}
};

//delete category and all subcategories
exports.delCategory = async function (ctx) {
	let categoryId = ctx.request.query.id;
	let categoryName = ctx.request.query.name;
	try {
		async function del_children(name) {
			let childrens = await Category.findAll({ where: { parent_name: name } });
			if(!childrens) return;
			await Category.destroy({
				where: {
					parent_name: name
				}
			});
			for(child of childrens) {
				del_children(child.name);
			}
		}
		del_children(categoryName);
		await Category.destroy({
			where: {
				id: categoryId
			}
		});
		ctx.status = 204;
	}
	catch (err) {
		ctx.status = 500;
	}
};
exports.putCategory = async function (ctx) {
	let categoryId = await ctx.request.body.id;
	let categoryName = await ctx.request.body.name;
	let categoryDescription = await ctx.request.body.description;
	let categoryParent_name = await ctx.request.body.parent_name;
	let categoryAvailability = await ctx.request.body.availability;
	console.log(ctx.request.body);

	try {
		await Category.update(
			{ name: categoryName,
				description: categoryDescription,
				parent_name: categoryParent_name,
				availability: categoryAvailability
			},
			{
				where: {
					id: categoryId
				}
			});
		ctx.status = 204;
	}
	catch (err) {
		ctx.status = 500;
	}
};