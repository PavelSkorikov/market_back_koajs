const
	config = require('./config.js'),
	views = require('koa-views'),
 logger = require('koa-morgan'),
 Router = require('koa-router'),
	koaBody = require('koa-body'),
 cors = require('@koa/cors'),
	jwtMiddleware = require('koa-jwt'),
 Koa = require('koa');

app = new Koa();
router = new Router();

app.use(require('koa-static')(__dirname));
app.use(logger('tiny'));
app.use(cors());
app.use(koaBody({
	jsonLimit: '1mb', // лимит для данных в формате json
	formLimit: '3mb', // лимит для файлов загружаемых черех multipart/formdata
	formidable:{uploadDir: './uploads'},    //путь к директории куда будут загружаться файлы
	multipart: true, // устанавливает возможность загрузки файлов из multipart/formdata
	multiples: true,	// устанавливает возможность загрузки одновременно нескольких файлов
	keepExtensions: true // сохраняем оригинальное расширение файла
}));

const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:1@localhost:5432/market');

// роут на регистрацию и авторизацию пользователей
const authRouter = require("./routes/auth/authRouter.js");
router.use("/auth", authRouter.routes());

// используем jwt, теперь все роуты которые лежат ниже
// должны требовать авторизацию jwt
router.use(jwtMiddleware({
	secret: config.secret,
}));

//роут  к админке сайта
const adminRouter = require("./routes/admin/admin.js");
router.use("/admin", adminRouter.routes());


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

app.listen(config.port);
console.log('server is running on '+ config.port);