var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var dotenvPath = require('dotenv').config();
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');

const {graphqlHTTP} = require('graphql');
const schema = require('./graphql/schema');

var app = express();

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV !== 'production'
    
}));

module.exports = {
    app,
    cors,
    corsOptions,
};
