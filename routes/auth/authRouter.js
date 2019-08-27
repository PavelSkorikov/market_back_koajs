const
	authController = require("../../controllers/authController.js"),
	Router = require('koa-router'),
	authRouter = new Router();

authRouter.post('/login', authController.authUser);


module.exports = authRouter;