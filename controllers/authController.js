const User = require("../models").User;
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const uuid = require('uuidv4');
const config = require('../config');

//аутентификация пользователя
exports.authUser = async function (ctx) {
	let data = ctx.request.body;
	//находим в базе пользователя по пришедшему email
	const user = await User.findOne({where: { email: data.email } });
	//если пользователь не найден или пароли не совпадают возвращаем ошибку
	if(!user || ! await argon2.verify(user.password, data.password)) {
		const error = new Error();
		error.status = 403;
		throw error;
	}
	//если e-mail и пароль совпали
	// генерируем произвольный refreshtoken с помощью модуля uuid
	const refreshtoken = uuid();
	// передаем пользователю в ответе новый токен и refreshtoken
	ctx.body = {
		token: jwt.sign({ id:user.id }, config.secret),
		refreshtoken,
	}

};
