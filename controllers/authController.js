const User = require("../models").User;
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const uuid = require('uuidv4');
const config = require('../config');

//аутентификация пользователя
exports.authUser = async function (ctx) {
	let data = ctx.request.body;
	//находим в базе пользователя по пришедшему email
	const user = await User.findOne({where: {email: data.email}});
	//если пользователь не найден или пароли не совпадают возвращаем ошибку
	if (!user || !await argon2.verify(user.password, data.password)) {
		const error = new Error();
		error.status = 403;
		throw error;
	}
	//если e-mail и пароль совпали
	// генерируем произвольный refreshtoken с помощью модуля uuid и записываем пользователю в базу данных
	const refreshtoken = uuid();
	await User.update({refreshtoken: refreshtoken}, {where: {id: user.id}});
	// передаем пользователю в ответе новый токен и refreshtoken
	// в токен добавляем только id пользователя, берем из конфига секретный ключ и времяжизни токена
	ctx.body = {
		token: jwt.sign({id: user.id}, config.secret, { expiresIn: config.time }),
		refreshtoken,
		group: user.group,
		name: user.name,
	}
};

//регистрация пользователя
		exports.regUser = async function (ctx) {
			let data = ctx.request.body;
			//хешируем пароль
			data.password = await argon2.hash(data.password);
			//создаем в базе пользователя с полученными данными
			const user = await User.create(data);
			//если не получилось создать пользователя в базе - возвращаем ошибку
			if (!user) {
				const error = new Error();
				error.status = 403;
				throw error;
			}
			//если все нормально
			// генерируем произвольный refreshtoken с помощью модуля uuid и записываем пользователю в базу данных
			const refreshtoken = uuid();
			await User.update({refreshtoken: refreshtoken}, {where: {id: user.id}});
			// передаем пользователю в ответе новый токен и refreshtoken
			ctx.body = {
				token: jwt.sign({id: user.id}, config.secret, { expiresIn: config.time }),
				refreshtoken,
				group: user.group,
				name: user.name,
			}
		};
