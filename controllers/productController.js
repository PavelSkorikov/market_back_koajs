const Product = require("../models").Product;
const Image = require("../models").Image;

// метод добавления нового товара в базу
exports.addProduct = async function (ctx) {
	//считываем из запроса данные
	let data = await ctx.request.body;
	//выбираем из принятых данных информацию о ранее загруженных файлах
	// фоторгафиях товара
	image_files = data.files;
	// создаем в базе Product новый товар,
	// а в базе Image связанные с ним файлы фотографий
	try {
		await Product.create(data)
			.then(()=>{
				 Product.findOne({where: {name: data.name}})
					.then(product => {
						for(key in image_files){
							Image.create({
								location: image_files[key],
								ProductId: product.id
							});
						}
					})
			});
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

exports.putProduct = async function (ctx) {
	//считываем из запроса данные
	let data = await ctx.request.body;
	//выбираем из принятых данных информацию о ранее загруженных файлах
	// фоторгафиях товара
	image_files = data.files;
	// изменяем в базе Product товар,
	// а в базу Image добавляем связанные с ним файлы фотографий если они есть
	try {
		await Product.update(data, {
			where: {
				id: data.id
			}
		})
		//затем, если добавились файлы изображений, то записываем в таблицу Images
		//пути к файлам и id продукта которому они соответствуют
			.then(()=>{
				if(image_files) {
					Product.findOne({where: {id: data.id}})
						.then(product => {
							for (key in image_files) {
								Image.create({
									location: image_files[key],
									ProductId: product.id
								});
							}
						})
				}
			});
		ctx.status = 204;
	}
	catch (err) {
		console.log('error write to base');
		ctx.status = 500;
	}
	};