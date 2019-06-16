const views = require('koa-views');
const logger = require('koa-morgan');
const Router = require('koa-router');
const bcrypt = require('bcrypt-nodejs');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const router = new Router();

const Koa = require('koa');
const app = new Koa();

app.use(logger('tiny'))
app.use(cors());
app.use(koaBody({
	jsonLimit: '1kb'
}));

const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:1@localhost:5432/market');


// response
app.use(ctx => {
	ctx.body = 'Hello Koa start';
});

app.listen(3000);