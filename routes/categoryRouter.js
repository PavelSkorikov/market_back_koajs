const
	categoryController = require("../controllers/categoryController"),
	Router = require('koa-router'),
	categoryRouter = new Router();

categoryRouter.post('/addCategory', categoryController.addCategory);
categoryRouter.get('/getCategory', categoryController.getCategory);
categoryRouter.del('/delCategory', categoryController.delCategory);
categoryRouter.put('/putCategory', categoryController.putCategory);

module.exports = categoryRouter;