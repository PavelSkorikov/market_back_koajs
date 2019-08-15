const Image = require("../models").Image


exports.addImage = async function (ctx) {
	//получаем из запроса (при помощи koaBody) объект file
	let upload = await ctx.request.files;
	//вытаскиваем из объекта file свойство path - это путь к файлу загруженному на сервер
	//и помещаем их в массив files
	let files = {};
	i = 0;
	for(var key in upload){
		files[i] = upload[key].path;
		i+=1;
	}
	console.log(files);
	try {
		ctx.body = files;
		ctx.status = 200;
	}
	catch (err) {
		console.log('error upload files');
		ctx.status = 500;
	}

};
exports.getImage = async function (ctx) {
	let product = await ctx.request.query.id;
	try {
		await Image.findAll({where: {ProductId: product}}).then(files => {
			console.log(JSON.stringify(files));
			let Images = files.map((file) => {
				return {
					id: file.id,
					path: 'http://localhost:3000/' + file.location
				}
			});
			console.log(Images);
			ctx.body = Images;
		});
		ctx.status = 200;
	}
	catch (err) {
		ctx.status = 500;
	}
};
exports.delImage = async function (ctx) {
	let data = ctx.request.query.id;
		try {
			await Product.destroy({
			where: {
				id: data
			}
		});
		ctx.status = 204;
	}
	catch (err) {
		ctx.status = 500;
	}
};
exports.putImage = async function (ctx) {
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