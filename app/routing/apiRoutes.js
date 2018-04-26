var path = require("path");
var fs = require("fs");

module.exports = function(app) {
	//displays the friends database
	app.get("/api/friends", function(req, res) {
		res.sendFile(path.join(__dirname, "../data/friends.txt"));
	})

	//handles post request from the survey
	app.post("/api/friends", function(req, res) {
		var newFriend = req.body;

		var friendsArray;

		var friendMatch;

		//reads and parses the database, then finds the most similar friend
		//to information submitted from the survey by calculating the difference
		//between the scores for each question
		fs.readFile(path.join(__dirname,'../data/friends.txt'), 'utf8', function(err, data) {
			if (err) {
				return console.error(err);
			}

			friendsArray = JSON.parse(data);

			var lowestDifference;

			for (i = 0; i < friendsArray.length; i++) {
				var sumDifference = 0;

				for (j = 0; j < friendsArray[i].scores.length; j++) {
					var addedDifference = Math.abs(newFriend.scores[j] - friendsArray[i].scores[j])

					sumDifference = sumDifference + addedDifference;
				}
				//console.log("This sumDifference is " + sumDifference)

				if (lowestDifference === undefined) {
					lowestDifference = sumDifference;
					friendMatch = friendsArray[i];
					//console.log("The friendMatch so far is " + friendMatch.name);
				} else if (sumDifference < lowestDifference) {
					lowestDifference = sumDifference;
					friendMatch = friendsArray[i];
					//console.log("The friendMatch so far is " + friendMatch.name);
				} else {
					//console.log("The friendMatch so far is " + friendMatch.name);
				}
			}

			console.log("The final friend match: " + friendMatch.name);

			//Adds the user input into the friend database
			friendsArray.push(newFriend);
			//console.log(friendsArray);
			fs.writeFile(path.join(__dirname, '../data/friends.txt'), JSON.stringify(friendsArray), function (err) {
				if (err) {
			 		return console.error(err);
				} 
			 	console.log('friends.txt was updated');
				});
			//Sends the matching friend information back to the survey page
			//console.log(friendMatch);
			res.json(friendMatch);
		})
		
	})
}