/*
 *  * Module dependencies
 *   */

// ////////////////////////////////
// MongoDB Setup
// ////////////////////////////////
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/pdb')

var db = mongoose.connection

db.on('error', console.error)
db.once('open', function () {
  console.log('Creating Schema and Model')
  // Create your schemas and models here.
  var appSchema = new mongoose.Schema({
    id: String,
    name: String,
    metadata: {
      urgency: Number,
      priority: Number
    },
    audit: {
      created_date: { type: Date, required: true },
      updated_date: { type: Date, default: Date.now }
    },
    services: [
      {
        name: String,
        type: String,
        integration_class: String
      }
    ],
    data: [
      {
        db_type: String,
        vol_Gb: Number,
        create: Boolean,
        read: Boolean,
        update: Boolean,
        delete: Boolean
      }
    ]
  })

  // Compile an 'Apps' model using the appSchema as the structure.
  // Mongoose also creates a MongoDB collection called 'Apps' for these documents.
  var Apps = mongoose.model('Apps', appSchema)
  console.log('Apps Model Created')
  module.exports = Apps
  listen()
})

function listen () {
  var Apps = mongoose.model('Apps')

  // ////////////////////////////////
  // Express Setup
  // ////////////////////////////////
  var express = require('express')

  var app = express()
  var bodyParser = require('body-parser')

  app.use(bodyParser.json()) // for parsing application/json

  app.get('/', function (req, res) {
    res.send('Hi there!')
  })

  // CRUD services

  // FIND BY NAME
  app.get('/app/:name', function (req, res) {
    console.log('Param - name: ' + req.params.name)
    Apps.findOne({ name: req.params.name }, function (err, result) {
      if (err) return console.error(err)
      console.log('Search result: ' + result)
      if (result) return res.send(result)
      res.status('404')
      res.send({ 'result': 'no record found with name:' + req.params.name })
    })
  })

  // CREATE
  app.put('/app/', function (req, res) {
    if (req.accepts('application/json') && typeof req.body !== 'undefined' && Object.keys(req.body).length !== 0) {
      console.log('request.body: ' + JSON.stringify(req.body))
      // auto-populate created_date
      req.body.audit = {}
      req.body.audit.created_date = Date.now()
      Apps.create(req.body, function (err, result) {
        if (err) return console.error(err)
        res.status('200')
        res.send({ 'result': 'success' })
      })
    } else {
      res.status('406')
      res.send({ 'result': 'invalid request body' })
    }
  })

  // UPDATE
  app.post('/app/', function (req, res) {
    // TODO
  })

  // DELETE
  app.delete('/app/:name', function (req, res) {
    // TODO
  })

  app.listen(8080)
}
