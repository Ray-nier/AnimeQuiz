var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var leadRouter = require('./routes/lead');
var genRouter = require('./routes/gen');
var aboutRouter = require('./routes/about');
var fetchQuestionsRouter = require('./routes/fetch_questions');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/lead', leadRouter);
app.use('/about', aboutRouter);
app.use('/gen', genRouter);
app.use('/fetch_questions', fetchQuestionsRouter);

mongoose.connect('mongodb://localhost:27017/quiz', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const resultSchema = new mongoose.Schema({
  name: String,
  result: String,
  score: Number,
  createdAt: { type: Date, default: Date.now }
});


const Result = mongoose.model('Result', resultSchema);

app.post('/saveResult', async (req, res) => {
  try {
    const { name, result } = req.body;
    const newResult = new Result({ name, result });
    await newResult.save();
    res.status(201).send({ message: 'Result saved successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to save result.' });
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
