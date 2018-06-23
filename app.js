const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
let PORT= app.listen(process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.set('view engine', 'pug');
app.use('/static',express.static('public'));

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards')

app.use(mainRoutes);
app.use('/cards', cardRoutes);



app.use(( req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(( err, req, res, next ) => {
  res.locals.error = err;
  if (err.status >= 100 && err.status < 600)
    res.status(err.status);
  else
    res.status(500);
  res.render('error');
});

if (PORT === 3000) {
app.listen(PORT, () => {
  console.log("Listening on port 3000!");
  });
} else
app.listen(PORT,()=>{
  console.log("Listening!")
});
