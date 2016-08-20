/*
 *  * Module dependencies
 *   */
var express = require('express')

var app = express()

app.get('/', function (req, res) {
  res.end('Hi there!')
})
app.listen(8080)
