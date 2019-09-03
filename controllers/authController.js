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
		refreshtoken
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
				refreshtoken
			}
		};

//выход пользователя
exports.logout = async function (ctx) {
	const id = ctx.request.body.id;
	//удаляем refreshtoken у пользователя в базе
	await User.update({refreshtoken: null}, {where: {id: id}});
};

		//метод обновления токена после истечения времени его жизни
		exports.refreshToken = async (ctx) => {
			//получаем в запросе текущий refreshtoken
			const { refreshtoken } = await ctx.request.body;
			//находим в базе пользователя с таким refreshtoken
			const user = await User.findOne({where: {refreshtoken: refreshtoken}});
			//если refreshtoken отсутствует выполняем выход,
			// в koa выход сопровождается ошибкой 404
			if(!user.refreshtoken){
				return;
			}
			//иначе генерируем новый refreshtoken, записываем пользователю в базу,
			// новый токен с id пользователя и отправляем их обрантно клиенту
			const newRefreshtoken = uuid();
			await User.update({refreshtoken: newRefreshtoken}, {where: {id: user.id}});
			ctx.body = {
				token: jwt.sign({id: user.id}, config.secret, { expiresIn: config.time }),
				refreshtoken: newRefreshtoken
			}
		};