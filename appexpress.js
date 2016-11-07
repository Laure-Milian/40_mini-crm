var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs');
var app = express()

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


 
app.get('/crm', function (req, res) {
  fs.readFile('public/crm.json', 'utf8', function(err, data) {
  	if (err) {
  		return console.log(err);
  	}

  	var dataObject = JSON.parse(data);

  	res.send(dataObject);
  })
})
 
app.listen(2000)