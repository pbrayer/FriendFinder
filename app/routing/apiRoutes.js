var data = require("../data/friends");

module.exports = function(app) { 
    
   app.get("/api/friends", function(req, res) {
      return res.json(data);
      });

   app.post("/api/friends", function(req, res) {

    var newFriend = req.body;

    var totalDifference = 0;
    var match = ""
    var matches = []
    // var maleMatches = []
    // var femaleMatches = []
   

    for(var i = 0; i < data.length; i++){
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
        totalDifference = 0;
    }

//    if(newFriend.gender === "Male"){
//     for(var i = 0; i < matches.length; i++){
//         if(data[i].gender === "Female"){
//             matches.splice(i, 1)
//         }
//     }
// }

//     if(newFriend.gender === "Female"){
//         for(var i = 0; i < matches.length; i++){
//             if(data[i].gender === "Male"){
//                 matches.splice(i, 1)
//             }
//         }
//     }

var index = 0;
var value = matches[0];
for (var i = 1; i < matches.length; i++) {
  if (matches[i] < value) {
    value = matches[i];
    index = i;
  }
}

match = data[index]


  
    // data.push(newFriend); I am commenting this out because I don't want people adding anything inappropriate to the existing characters.
  
    return res.json(match);

  });

  
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
   });

}