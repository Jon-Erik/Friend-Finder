var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var friends = require("./app/data/friends")

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "app/public/home.html"));
})

app.get("/survey", function(req, res) {
	res.sendFile(path.join(__dirname, "app/public/survey.html"));
})

app.get("/all", function(req, res) {
	res.sendFile(path.join(__dirname, "app/data/friends.js"));
})

app.post("/api/new", function(req, res) {
	var newfriend = req.body;

	friends.push(newfriend);
	console.log(friends);
	res.status(200).send();
})

app.listen(PORT, function() {
	console.log("Friend-finder listening on PORT " + PORT)
})
