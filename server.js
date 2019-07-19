const http = require('http');
const https = require('https');
const fs = require('fs');
const views = require('koa-views');
const logger = require('koa-morgan');
const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const Koa = require('koa');
const app = new Koa();

app.use(logger('tiny'));
app.use(cors());
app.use(koaBody({
	jsonLimit: '1kb'
}));

const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:1@localhost:5432/market');

const companyRouter = require("./routes/companyRouter.js");
app.use(companyRouter.routes());
const categoryRouter = require("./routes/categoryRouter.js");
app.use(categoryRouter.routes());

router.get('/', main);
app.use(router.routes());
async function main(ctx) {
	ctx.body = '<h1>Привет! Я Koa - сервер :)</h1>';
}

app.use(ctx => {
	if (ctx.status == 404) ctx.body = "Not Found"
});


// response
app.use(ctx => {
	ctx.body = 'Hello Koa start';
});

app.listen(3000);
console.log('server is running on http://localhost:3000/');