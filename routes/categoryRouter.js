const categoryController = require("../controllers/categoryController");
const Router = require('koa-router');
const categoryRouter = new Router();

categoryRouter.post('/addCategory', categoryController.addCategory);
categoryRouter.get('/getCategory', categoryController.getCategory);
categoryRouter.del('/delCategory', categoryController.delCategory);
categoryRouter.put('/putCategory', categoryController.putCategory);

module.exports = categoryRouter;