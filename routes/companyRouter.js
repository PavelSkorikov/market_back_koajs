const companyController = require("../controllers/companyController.js");
const Router = require('koa-router');
const companyRouter = new Router();

companyRouter.get('/countCompanies', companyController.countCompanies);
companyRouter.post('/addCompany', companyController.addCompany);
companyRouter.get('/getCompany', companyController.getCompany);
companyRouter.del('/delCompany', companyController.delCompany);
companyRouter.put('/putCompany', companyController.putCompany);

module.exports = companyRouter;