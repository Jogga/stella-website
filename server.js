const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const config = require('./config.js');
const app = express();
var db;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// CRUD

app.get('/contact', (req, res) => {
  res.send('reach out to us by mail: contact *at* stellabot *dot* com');
});

app.post('/signup', (req, res) => {
  db.collection('emails').save(req.body, (err, result) => {
    if(err) return console.log(err);
    console.log('saved to database');
    res.send('thank you for signing up!');
  });
});

// Start Server

MongoClient.connect(
  mongoUrlHelper(), (err, database) => {
  if(err) return console.log(err);
  db = database;
  app.listen(8000, () => {
    console.log('listening on 8000');
  });
});

// Helper

function mongoUrlHelper() {
  url = [
    'mongodb://', 
    config.mongodb.username, 
    ':', 
    config.mongodb.password, 
    '@',
    config.mongodb.url, 
    config.mongodb.database
  ].join('');
  return url;
}

