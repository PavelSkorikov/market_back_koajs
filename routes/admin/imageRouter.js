const imageController = require("../../controllers/imageController.js");
const Router = require('koa-router');
const imageRouter = new Router();


imageRouter.post('/addImage', imageController.addImage);
imageRouter.get('/getImage', imageController.getImage);
imageRouter.del('/delImage', imageController.delImage);

module.exports = imageRouter;