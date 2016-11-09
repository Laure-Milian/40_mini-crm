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
		res.send('got post request')

		var dataObject = JSON.parse(data);

		//Ajouter l'id
		req.body.id = dataObject.customers.length + 1;

		dataObject.customers.push(req.body);
		var newData = JSON.stringify(dataObject);

		fs.writeFile('public/crm.json', newData, 'utf8', function(err, data) {
			if (err) {
				return console.log(err);
			}

		})

	})

})

app.delete('/deleteCustomer', function(req, res) {


	fs.readFile('public/crm.json', 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		res.send('got delete request');

		var dataObject = JSON.parse(data);

		//Partie spécifique delete
		var idSelectedCustomer = parseInt(req.body.id, 10);
		var len = dataObject.customers.length;
		for (var i = 0; i < len; i++) {
			if (dataObject.customers[i].id === idSelectedCustomer) {
				console.log("doit apparaitre une fois UNE FOIS");
			}
		}
	//	if (req.body.id === dataObject.customers.id) {

	})
})

app.listen(2000)