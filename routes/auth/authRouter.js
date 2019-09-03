const
	authController = require("../../controllers/authController.js"),
	Router = require('koa-router'),
	authRouter = new Router();

authRouter.post('/login', authController.authUser);
authRouter.post('/register', authController.regUser);
authRouter.post('/refresh', authController.refreshToken);
authRouter.post('/logout', authController.logout);


module.exports = authRouter;