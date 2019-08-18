const productController = require("../controllers/productController.js");
const Router = require('koa-router');
const productRouter = new Router();

productRouter.get('/countProduct', productController.countProducts);
productRouter.post('/addProduct', productController.addProduct);
productRouter.get('/getProduct', productController.getProduct);
productRouter.del('/delProduct', productController.delProduct);
productRouter.put('/putProduct', productController.putProduct);

module.exports = productRouter;