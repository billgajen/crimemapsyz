const express = require('express');
const app = express();
//const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const request = require("request");
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//Routes
app.get("/", (req, res) => res.sendFile(__dirname + '/public/views/index.html'));

//API
app.get("/api/getCrimesData/:date/:lat/:lng", (req, res) => {

	//get JSON data - If necessary I can restucture the crime data
	request.get('https://data.police.uk/api/crimes-street/all-crime?date='+req.params.date+'&lat='+req.params.lat+'&lng='+req.params.lng, (error, response, body) => {
		var json = JSON.parse(body);
		res.send(json);
	});
});

app.listen(port);
console.log('App listening on port' + port);

module.exports = app; // for testing