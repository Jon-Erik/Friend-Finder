var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

var htmlRoutes = require("./app/routing/htmlRoutes.js")
htmlRoutes(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var apiRoutes = require("./app/routing/apiRoutes.js");
apiRoutes(app);

app.listen(PORT, function() {
	console.log("Friend-finder listening on PORT " + PORT)
})
