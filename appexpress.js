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

app.post('/createCustomer', function(req, res) {

	fs.readFile('public/crm.json', 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		console.log(data);
		res.send('got post request')

		//Récupérer le JSON et le transformer en objet
		var dataObject = JSON.parse(data);

		//Ajouter l'id
		req.body.id = dataObject.customers.length + 1;
		console.log(req.body);

		dataObject.customers.push(req.body);
		var newData = JSON.stringify(dataObject);

		fs.writeFile('public/crm.json', newData, 'utf8', function(err, data) {
			if (err) {
				return console.log(err);
			}

		})

	})

})

app.listen(2000)