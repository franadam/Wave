const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const usersRouter = require('./routes/users');
const brandsRouter = require('./routes/brands');
const woodsRouter = require('./routes/woods');
const guitarsRouter = require('./routes/guitars');
const shopRouter = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/products/brands', brandsRouter);
app.use('/api/products/woods', woodsRouter);
app.use('/api/products/guitars', guitarsRouter);
app.use('/api/products/shop', shopRouter);

module.exports = app;
