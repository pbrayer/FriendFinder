var data = require("../data/friends");
var path = require("path");

module.exports = function(app) { 
    
   app.get("/api/friends", function(req, res) { //Get route for all entries in friends
      return res.json(data);
      });

   app.post("/api/friends", function(req, res) { //Post route that also contains all the match logic

    var newFriend = req.body;

    var totalDifference = 0;
    var match = ""
    var matches = []
   

    for(var i = 0; i < data.length; i++){ //For loop that goes through each question and totals the differences in answers
        totalDifference = totalDifference + Math.abs(newFriend.scores[0] - data[i].scores[0]) 
        totalDifference = totalDifference + Math.abs(newFriend.scores[1] - data[i].scores[1])
        totalDifference = totalDifference + Math.abs(newFriend.scores[2] - data[i].scores[2])
        totalDifference = totalDifference + Math.abs(newFriend.scores[3] - data[i].scores[3])
        totalDifference = totalDifference + Math.abs(newFriend.scores[4] - data[i].scores[4])
        totalDifference = totalDifference + Math.abs(newFriend.scores[5] - data[i].scores[5])
        totalDifference = totalDifference + Math.abs(newFriend.scores[6] - data[i].scores[6])
        totalDifference = totalDifference + Math.abs(newFriend.scores[7] - data[i].scores[7])
        totalDifference = totalDifference + Math.abs(newFriend.scores[8] - data[i].scores[8])
        totalDifference = totalDifference + Math.abs(newFriend.scores[9] - data[i].scores[9])

        matches.push(totalDifference)
        totalDifference = 0; //Need to reset totalDifference's value between each character
    }

   if(newFriend.gender === "Male"){
    for(var i = 0; i < matches.length; i++){
        if(data[i].gender === "Female"){
            matches[i] = 100;
        }
    }
}

    if(newFriend.gender === "Female"){
        for(var i = 0; i < matches.length; i++){
            if(data[i].gender === "Male"){
                matches[i] = 100; //Sets match differential to 100 so that there is no chance they will be matched 
            }
        }
    }

var index = 0;  //For loop that searched for best match (lowest total difference from matches)
var value = matches[0];
for (var i = 1; i < matches.length; i++) {
  if (matches[i] < value) {
    value = matches[i];
    index = i;
  }
}

match = data[index] //Sets the match 


  
    // data.push(newFriend); I am commenting this out because I don't want people adding anything inappropriate to the existing characters.
  
    return res.json(match);

  });

  app.get("*", function(req, res) {  //Putting the catchall here
    res.sendFile(path.join(__dirname, "../public/home.html")); 
   });

}