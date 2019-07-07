const companyController = require("../controllers/companyController.js");
const Router = require('koa-router');
const companyRouter = new Router();

companyRouter.post('/addCompany', companyController.addCompany);
companyRouter.get('/getCompany', companyController.getCompany);

module.exports = companyRouter;