const
	countController = require("../controllers/countController.js"),
	Router = require('koa-router'),
	countRouter = new Router();

countRouter.get('/countItems', countController.countItems);

module.exports = countRouter;