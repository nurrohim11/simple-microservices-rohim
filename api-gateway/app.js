var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

const port = process.env.PORT || '3000'

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set url in locals and variable other
app.use ((req, res, next) => {
  res.printjson = (status, message, response)=> {
    // Do whatever you want, you have access to req and res in this closure
    res.json({
      response : response,
      metadata: {
        status:status,
        message:message
      },
    })
  }
  
  next();
});

app.use('/', indexRouter);

app.listen(port,()=>{
  console.log(`server running at port ${port}`)
})

module.exports = app;
