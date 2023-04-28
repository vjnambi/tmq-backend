var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require("./models");
const cors = require("cors");

const indexRouter = require("./routes/index")
const registerRouter = require("./routes/register")
const loginRouter = require("./routes/login")
const vqsRouter = require("./routes/viewQuestionSets")
const vqRouter = require("./routes/viewQuestions")
const cqsRouter = require("./routes/createQuestionSet")
const cqRouter = require("./routes/createQuestion")
const sqsRouter = require("./routes/searchQuestionSet")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use("/", indexRouter)
app.use("/register", registerRouter)
app.use("/login", loginRouter)
app.use("/viewQuestionSets", vqsRouter)
app.use("/viewQuestions", vqRouter)
app.use("/createQuestionSet", cqsRouter)
app.use("/createQuestion", cqRouter)
app.use("/searchQuestionSet", sqsRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db.sequelize.sync()

module.exports = app;
