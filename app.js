const express = require('express');
const fs = require('fs');
const util = require('util');
const morgan  = require('morgan');
const articleController = require('./controllers/articleController');
const userController = require('./controllers/userController');
const userRouter = require('./routes/userRouter');
const articleRouter = require('./routes/articleRouter');

const app = express();
app.use(express.json());
app.use((req, res, next)=>{
    console.log('hello from middleware');
    next();
});
app.use(morgan('dev'));
app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/users', userRouter);

module.exports= app;