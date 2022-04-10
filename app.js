const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const cors = require('@koa/cors');

app.use(cors());

app.use(async (ctx, next) => {
  ctx.request.requestTime = new Date().toString()
  await next()
})

// 全局捕获异常
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.body = {
      error: e.toString(),
      requestTime: ctx.request.requestTime,
      responseTime: new Date().toString(),
    }
  }
})


app.use(koaBody({
  multipart: true,
  formidable: {
    keepExtensions: true,
    hash: 'md5'
  }
}));


app.use(ctx => {
  ctx.body = {
    url: ctx.request.url,
    httpVersion: ctx.req.httpVersion,
    method: ctx.request.method,
    headers: ctx.request.headers,
    requestTime: ctx.request.requestTime,
    responseTime: new Date().toString(),
    query: ctx.request.query,
    body: {...ctx.request.files, ...ctx.request.body}
  };
});

app.listen(38002);
