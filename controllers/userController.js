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

//добавляем пользователя в базу
exports.addUser = async function (ctx) {
	let user = await ctx.request.body;
	let passwordHashed = await argon2.hash(user.password);
	try {
		await User.create({
			password: passwordHashed,
			email: user.email,
			group: user.group,
			status: user.status,
			discount: user.discount
		});
		ctx.status = 200;
	}
	catch (err) {
		console.log('error write to base');
		ctx.status = 500;
	}

};

// удаляем пользователя по заданному email
exports.delUser = async function (ctx) {
	let id = ctx.request.query.id;
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