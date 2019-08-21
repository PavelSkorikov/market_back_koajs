const
	productController = require("../controllers/productController.js"),
	Router = require('koa-router'),
	productRouter = new Router();

productRouter.post('/addProduct', productController.addProduct);
productRouter.get('/getProduct', productController.getProduct);
productRouter.del('/delProduct', productController.delProduct);
productRouter.put('/putProduct', productController.putProduct);

module.exports = productRouter;