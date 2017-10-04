const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const models = require('../models');
const db = models.db;
const app = express();
const router = require('./api')


app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', router)

app.use(function(req, res, next){
  let err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  console.error(err, err.stack);
  res.send(err.message);
});

app.listen(3000, function(){
  console.log('listening on port 3000');
  db.sync()
  .then(function(){
    console.log('synchronized to the database')
  })
  .catch(function(){
    console.log(err);
  });
});

