const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT= 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.set('view engine', 'pug');

const routes = require('./routes');

app.use(routes);

app.use((req,res,next) => {
  console.log('World');
  next();
});


app.use(( req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} !`);
});
