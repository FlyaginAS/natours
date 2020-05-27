const  express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRouters');
const userRouter = require('./routes/userRouters');

const app = express();
//middlewares
app.use(express.json());
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));
//routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
