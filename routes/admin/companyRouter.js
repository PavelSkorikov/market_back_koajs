const
	companyController = require("../../controllers/companyController.js"),
	Router = require('koa-router'),
	companyRouter = new Router();

companyRouter.post('/addCompany', companyController.addCompany);
companyRouter.get('/getCompany', companyController.getCompany);
companyRouter.del('/delCompany', companyController.delCompany);
companyRouter.put('/putCompany', companyController.putCompany);

module.exports = companyRouter;