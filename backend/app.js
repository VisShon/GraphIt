var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var dotenvPath = require('dotenv').config();
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var errorHandler = require('./middleware/errorHandler');
var passport = require('passport');


const {graphqlHTTP} = require('express-graphql');
const {schema} = require('./graphql');
const connectDB = require('./config/db');
const passportConfig = require('./config/passport')
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

connectDB();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
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