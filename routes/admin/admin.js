const
	Router = require('koa-router'),
	adminRouter = new Router();

const countRouter = require("./countRouter.js");
adminRouter.use(countRouter.routes());
const userRouter = require("./userRouter.js");
adminRouter.use(userRouter.routes());
const companyRouter = require("./companyRouter.js");
adminRouter.use(companyRouter.routes());
const categoryRouter = require("./categoryRouter.js");
adminRouter.use(categoryRouter.routes());
const productRouter = require("./productRouter.js");
adminRouter.use(productRouter.routes());
const imageRouter = require("./imageRouter.js");
adminRouter.use(imageRouter.routes());

module.exports = adminRouter;

