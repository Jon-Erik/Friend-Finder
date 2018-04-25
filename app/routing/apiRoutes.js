var path = require("path");
var fs = require("fs");

module.exports = function(app) {
	app.get("/api/friends", function(req, res) {
		res.sendFile(path.join(__dirname, "../data/friends.txt"));
	})

	app.post("/api/friends", function(req, res) {
		var newFriend = req.body;

		var friendsArray;

		fs.readFile(path.join(__dirname,'../data/friends.txt'), 'utf8', function(err, data) {
		if (err) {
			return console.error(err);
		}

		friendsArray = JSON.parse(data);

		var friendMatch;
		var lowestDifference;

		for (i = 0; i < friendsArray.length; i++) {
			var sumDifference = 0;

			for (j = 0; j < friendsArray[i].scores.length; j++) {
				var addedDifference = Math.abs(newFriend.scores[j] - friendsArray[i].scores[j])

				sumDifference = sumDifference + addedDifference;
			}
			console.log("This sumDifference is " + sumDifference)

			if (lowestDifference === undefined) {
				lowestDifference = sumDifference;
				friendMatch = friendsArray[i];
				console.log("The friendMatch so far is " + friendMatch.name);
			} else if (sumDifference < lowestDifference) {
				lowestDifference = sumDifference;
				friendMatch = friendsArray[i];
				console.log("The friendMatch so far is " + friendMatch.name);
			} else {
				console.log("The friendMatch so far is " + friendMatch.name);
			}
		}

		console.log("The final friend match: " + friendMatch.name);

		friendsArray.push(newFriend);

		console.log(friendsArray);
		
		fs.writeFile(path.join(__dirname, '../data/friends.txt'), JSON.stringify(friendsArray), function (err) {
			if (err) {
		 		return console.error(err);
			} 
		 	console.log('friends.txt was updated');
			});

		})
		res.status(200).send();
	})
}