let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');
let bodyParser = require('body-parser');
let multer = require('multer');
let mongoose = require("mongoose");

let indexRouter = require('./routes/index');
let mediaConverterRouter = require('./routes/media-converter');
let companiesRouter = require('./routes/companies');
let profileRouter = require('./routes/profile');

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors({origin: '*'}));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/temp");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
app.use(multer({storage:storageConfig}).single("file"));

let authController = require('./controllers/auth')
app.use(authController.middlewareAuth)

app.use('/', indexRouter);
app.use('/media', mediaConverterRouter);
app.use('/companies', companiesRouter);
app.post('/auth', authController.authByEmail);
app.post('/register', authController.register);
app.use('/profile', profileRouter);

let connectionString = "mongodb+srv://tyulyukov:buDFZ4ws9ShY3rw7@cluster0.docye.mongodb.net/DiamoDatabase?retryWrites=true&w=majority";
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) { if (err) console.error(err) } )

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;