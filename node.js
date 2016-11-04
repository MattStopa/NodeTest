var express = require('express')
var app = express()
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', { name: String, age: Number });

app.get('/', function (req, res) {
  var kitty = new Cat({ name: req.query.name, age: req.query.age });
  kitty.save(function (err) {
    if (err) {
      console.log(err);
      res.send(err)
    } else {
      res.send('It worked')
    }
  });
})

app.get('/search', function(req,res) {
  Cat.find().where('age').gt(17).lt(66).exec(function(err, data) {
    console.log(data)
    res.send(data)

  })
})

app.get('/bananaface', function(req, res) {
  res.send(req.query)
})

app.post('/bananaface', function(req, res) {
  res.send(req.query)
})

app.listen(3002, function () {
  console.log('Example app listening on port 3000!')
})
