const
	authController = require("../../controllers/authController.js"),
	Router = require('koa-router'),
	authRouter = new Router();
	jwtMiddleware = require('koa-jwt');
	config = require('../../config.js');

authRouter.post('/login', authController.authUser);
authRouter.post('/register', authController.regUser);
authRouter.post('/refresh', authController.refreshToken);
//добавляем к роуту koa-jwt чтобы логаут совершался только для залогиненного пользователя
authRouter.post('/logout', authController.logout, jwtMiddleware({secret: config.secret}));

module.exports = authRouter;