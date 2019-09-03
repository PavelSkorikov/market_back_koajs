const User = require("../models").User;
const argon2 = require('argon2');


//отдаем список пользователей из базы
exports.getUsers = async function (ctx) {
	try {
		await User.findAll().then(users => {
			//формируем список пользователей без поля password
			let userList = users.map((user) => {
				return {
					id: user.id,
					name: user.name,
					email: user.email,
					discount: user.discount,
					group: user.group,
					status: user.status,
					updatedAt: user.updatedAt
				}
			});
			//отдаем полученный список
			ctx.body = userList;
		});
		ctx.status = 200;
	}
	catch (err) {
		ctx.status = 500;
	}
};

//метод отдачи данных о пользователе по запросу с id пользователя
exports.getUser = async (ctx) => {
	const id = ctx.request.query.id;
	try {
		await User.findOne({where: {id: id}})
			.then(user => {
				console.log(user);
				ctx.body = {
					group: user.group,
					name: user.name,
					status: user.status,
					discount: user.discount
				}
			});
	} catch (err) {
		console.log('error find user in base');
		ctx.status = 500;
	}
};

//добавляем пользователя в базу
exports.addUser = async function (ctx) {
	let user = await ctx.request.body;
	user.password = await argon2.hash(user.password);
	try {
		await User.create(user);
		ctx.status = 200;
	}
	catch (err) {
		console.log('error write to base');
		ctx.status = 500;
	}

};

// удаляем пользователя по заданному email
exports.delUser = async function (ctx) {
	const id = ctx.request.query.id;
	try {
		await User.destroy({
			where: {
				id: id
			}
		});
		ctx.status = 204;
	}
	catch (err) {
		ctx.status = 500;
	}
};

// метод изменения данных пользователя
exports.putUser = async function (ctx) {
	//считываем из запроса данные
	let data = await ctx.request.body;
	if(data.password){
		data.password = await argon2.hash(data.password);
	}
	try {
		await User.update(data, {
			where: {
				id: data.id
			}
		});
		ctx.status = 204;
	}
	catch (err) {
		console.log('error write to base');
		ctx.status = 500;
	}
};