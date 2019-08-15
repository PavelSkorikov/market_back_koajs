const views = require('koa-views'),
 logger = require('koa-morgan'),
 Router = require('koa-router'),
	koaBody = require('koa-body'),
 cors = require('@koa/cors'),
 Koa = require('koa');

app = new Koa();
router = new Router();

app.use(require('koa-static')(__dirname));
app.use(logger('tiny'));
app.use(cors());
app.use(koaBody({
	jsonLimit: '1mb', // лимит для данных в формате json
	formLimit: '5mb', // лимит для файлов загружаемых черех multipart/formdata
	formidable:{uploadDir: './uploads'},    //путь к директории куда будут загружаться файлы
	multipart: true, // устанавливает возможность загрузки файлов из multipart/formdata
	multiples: true,	// устанавливает возможность загрузки одновременно нескольких файлов
	keepExtensions: true // сохраняем оригинальное расширение файла
}));

const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:1@localhost:5432/market');

const companyRouter = require("./routes/companyRouter.js");
app.use(companyRouter.routes());
const categoryRouter = require("./routes/categoryRouter.js");
app.use(categoryRouter.routes());
const productRouter = require("./routes/productRouter.js");
app.use(productRouter.routes());
const imageRouter = require("./routes/imageRouter.js");
app.use(imageRouter.routes());

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