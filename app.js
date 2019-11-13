const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')

const passport = require('./passport/index')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const PORT = process.env.PORT || 8080
const log = console.log;

var app = express();
mongoose.connect('mongodb+srv://naosan:<secret>@cluster0-yifl2.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter);
app.use('/authentication', usersRouter);


app.listen(PORT, () => {
  log(`Server is listening on PORT ${PORT}`);
})


module.exports = app;