const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const app = new Koa();
app.use(bodyParser());

// Load routes
const postRoutes = require('./app/routes/posts');
const userRoutes = require('./app/routes/users');

// Database
mongoose.connect(
  'mongodb://localhost/koablog'
);
mongoose.Promise = global.Promise;

// Error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

// Routes
app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());
app.use(postRoutes.routes());
app.use(postRoutes.allowedMethods());

module.exports = app;
