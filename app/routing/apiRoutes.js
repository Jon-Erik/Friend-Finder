var path = require("path");
var friends = require("../data/friends.js");
var fs = require("fs");

module.exports = function(app) {
	app.get("/api/friends", function(req, res) {
		res.sendFile(path.join(__dirname, "../data/friends.js"));
	})

	app.post("/api/friends", function(req, res) {
		var newfriend = req.body;
		console.log(newfriend);
		console.log(newfriend.scores[0]);

		var friendMatch;
		var lowestDifference;
		

		for (i = 0; i < friends.length; i++) {
			var sumDifference;

			for (j = 0; j < friends[i].scores.length; i++) {
				var addedDifference = Math.abs(newfriend.scores[j] - friends[j].scores[j]);
				sumDifference = sumDifference + addedDifference;
			}

			if (lowestDifference === undefined) {
				sumDifference = lowestDifference;
				friendMatch = friends[i];
			} else if (sumDifference < lowestDifference) {
				lowestDifference = sumDifference;
				friendMatch = friends[i];
			}
		}

		console.log("Friend match:" + friendMatch);

		// var friendsArray = JSON.parse(friends);

		// friendsArray.push(newfriend);

		// console.log(friendsArray);
		
		res.status(200).send();
	})
}