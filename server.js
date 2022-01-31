// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
//choosing port
const port = 4040;
//creating a local server
const server = app.listen(port, () => { console.log(`running on localhost: ${port}`) });
//GET request
//request data from server
//callback function to handle a route
app.get('/all', function (req, res) {
	res.send(projectData);
})

//POST Request
//send data to app
//adds incoming data to projectData
app.post("/add", function addData(req, res) {
	let data = req.body;
	console.log(data);
	let newEntry = {
		date: data.date,
		temp: data.temp,
		content: data.content
	};
	projectData = newEntry;
	res.send(projectData);
});