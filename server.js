const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');
const config = require('./config.js');
const ab = require('express-ab');
const path = require('path');
const expstate = require('express-state');
const exphbs = require('express-handlebars');
var app = express();
var db;

expstate.extend(app);
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.json({
  extended: true
}));
app.use(cookieParser());

// CRUD

app.get('/contact', (req, res) => {
  res.send('reach out to us by mail: stella *at* stellabot *dot* com');
});

app.post('/signup', (req, res) => {
  if(validateEmail(req.body.email)) {
    var dbEntry = {};
    dbEntry.email = req.body.email;
    db.collection('emails').save(req.body, (err, result) => {
      if(err) return console.log(err);
      console.log('saved to database');
      res.end();
    });
  } else {
    res.send('email could not be saved');
  }
});

// A/B Testing

var myPageTest = ab.test('stella-landingpage-test', { id: config.multivariant.experimentId });

app.expose({experiment_id: config.multivariant.experimentId});

app.get('/', myPageTest(), function (req, res) {
  res.expose({experiment_variant: res.locals.ab.variantId});
  res.render(path.join(__dirname + config.multivariant.a.landingpage));
});

app.get('/', myPageTest(), function (req, res) {
  res.expose({experiment_variant: res.locals.ab.variantId});
  res.render(path.join(__dirname + config.multivariant.b.landingpage));
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

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
