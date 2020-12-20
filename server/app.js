const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/user', userRouter);

module.exports = app;
