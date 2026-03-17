var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/user');
var vehicleRouter = require('./routes/vehicle');
var bookingRouter = require('./routes/booking');
var paymentRouter = require('./routes/payment');
var FeedbackRouter = require('./routes/feedback');
var locationRouter = require('./routes/location');
var MaintenanceRouter = require('./routes/maintenance');
var couponRouter = require('./routes/coupon');
var meinRoutes = require('./routes/meinroutes');


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/vehicle')
  .then(() => {
    console.log('mongoDB connect successfully');
  })
  .catch((error) => {
    console.log(error);
  })

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/user', userRouter)
app.use('/vehicle', vehicleRouter)
app.use('/booking', bookingRouter)
app.use('/payment', paymentRouter)
app.use('/feedback', FeedbackRouter)
app.use('/location', locationRouter)
app.use('/maintenance', MaintenanceRouter)
app.use('/coupon', couponRouter)
app.use('/all-data', meinRoutes)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
