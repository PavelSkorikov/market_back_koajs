const Image = require("../models").Image;
var fs = require("fs");

//метод добавления файлов изображений одного товара на сервер
//и отправки путей к этим файлам обратно клиенту
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
	//отправляем массив с путями к файлам обратно клиенту
	try {
		ctx.body = files;
		ctx.status = 200;
	}
	catch (err) {
		console.log('error upload files');
		ctx.status = 500;
	}
};

// метод который по запрошенному клиентом id товара отправляет
// назад JSON содержащий id картинок и пути к файлам картинок
// соответствущих запрошенному товару
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

//метод которрый принимает id картинки и путь к файлу картинки
//и соответственно удаляет запись в базе и файл картинки на диске
exports.delImage = async function (ctx) {
	let id = ctx.request.query.id;
	//получаем путь к файлу удаляя с помощью регулярного выражения
	//ненужную часть url: http://localhost:3000/ или другую
	let exp = /^htt\w+:\/\/\w+:\w+\//;
	let path = ctx.request.query.path.replace(exp, '');
	console.log(path);
	//удаляем запись в базе
		try {
			await Image.destroy({
			where: {
				id: id
			}
			//затем удаляем файл с диска
		}).then(() =>{
				fs.unlink(path, function(err){
					if (err) {
						console.log(err);
					} else {
						console.log("Файл удалён");
					}
				});
			});
		ctx.status = 204;
	}
	catch (err) {
		ctx.status = 500;
	}
};