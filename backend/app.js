var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var dotenvPath = require('dotenv').config();
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var errorHandler = require('./middleware/errorHandler');


const {graphqlHTTP} = require('express-graphql');
const {schema} = require('./graphql');
const connectDB = require('./config/db');

var app = express();

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',cors(corsOptions),indexRouter);
app.use('/graphql',cors(corsOptions),graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV !== 'production'
}));

module.exports = {
    app,
    cors,
    corsOptions,
};