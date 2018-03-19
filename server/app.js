const express    = require('express')
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose')
const users      = require('./routes/users')
require('dotenv').config()


mongoose.connect('mongodb://agnynureza:12345@ds117469.mlab.com:17469/blog-tdd-db')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/users',users)



// app.listen(3000,()=>console.log('server up !'))

module.exports = app