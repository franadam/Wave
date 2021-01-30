const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const usersRouter = require('./routes/users');
const brandsRouter = require('./routes/brands');
const woodsRouter = require('./routes/woods');
const guitarsRouter = require('./routes/guitars');
const shopRouter = require('./routes/shop');
const sitesRouter = require('./routes/sites');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/products/brands', brandsRouter);
app.use('/api/products/woods', woodsRouter);
app.use('/api/products/guitars', guitarsRouter);
app.use('/api/products/shop', shopRouter);
app.use('/api/sites', sitesRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

module.exports = app;
