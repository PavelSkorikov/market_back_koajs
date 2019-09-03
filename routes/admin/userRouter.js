const
	userController = require("../../controllers/userController.js"),
	Router = require('koa-router'),
	userRouter = new Router();

userRouter.post('/addUser', userController.addUser);
userRouter.get('/getUsers', userController.getUsers);
userRouter.get('/getUser', userController.getUser);
userRouter.del('/delUser', userController.delUser);
userRouter.put('/putUser', userController.putUser);

module.exports = userRouter;