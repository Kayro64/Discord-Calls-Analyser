function countAndConvert() {
  var boxsimple = document.getElementById('boxsimpleid')
  boxsimple.style.backgroundColor = '#332f2d';
  var text = document.getElementById("textInput").value;
  var count = (text.match(/Started a call that lasted/g) || []).length;
  var minutes = 0;
  var seconds = 0;
  var output = "There were " + count + " calls in this conversation. <br><br>";

  var matches = text.match(/(\d+) minutes/g);
  if(matches){
    matches.forEach(match => {
      var matchMinutes = match.replace(" minutes", "");
      minutes += parseInt(matchMinutes);
    });
    var hour = Math.floor(minutes / 60);
    var leftMinutes = minutes % 60;
    output += "The calls lasted " + hour + " hours and " + leftMinutes + " minutes. <br>";
    output += "It is " + minutes + " minutes in total. <br>";
    output += "Or " + (minutes * 60) + " seconds.";
  } else {
    output += "No call time found in the conversation";
  }

  var maxMinutes = 0;
  var maxMinutesIndex = 0;
  var matches = text.match(/Started a call that lasted (\d+)/g);
  if(matches){
    matches.forEach((match, index) => {
      var matchMinutes = match.match(/(\d+)/)[1];
      if (parseInt(matchMinutes) > maxMinutes) {
        maxMinutes = parseInt(matchMinutes);
        maxMinutesIndex = index;
      }
    });
    var maxhour = Math.floor(maxMinutes / 60);
    var maxleftMinutes = maxMinutes % 60;
    output += "<br><br>The longest call was " + maxhour + " hours and " + maxleftMinutes + " minutes long. <br>";
    //var po = "po";
    //var regex = new RegExp("^([^\n]+)\nStarted a call that lasted " + po + "/gm");
    //var dirtyuserMatches = text.match(regex);
    //console.log(dirtyuserMatches);

    //var userMatches = dirtyuserMatches.map(match => match.replace(/\[[^\]]*\]/g, ""));

  }




  document.getElementById("output").innerHTML = output;


// Create an object to store the count of each user
var userCount = {};
// Use regular expression to find all occurrences of user name before "Started a call that lasted"
var dirtyuserMatches = text.match(/^([^\n]+)\nStarted a call that lasted/gm);
var userMatches = dirtyuserMatches.map(match => match.replace(/\[[^\]]*\]/g, ""));
if (userMatches) {
  userMatches.forEach(match => {
    var user = match.split("\n")[0];
    if (userCount[user]) {
      userCount[user]++;
    } else {
      userCount[user] = 1;
    }
  });
}
// Find the user with the most occurrences
var mostFrequentUser = "";
var maxCount = 0;
for (var user in userCount) {
  if (userCount[user] > maxCount) {
    maxCount = userCount[user];
    mostFrequentUser = user;
  }
}
output += "<br><br> The user who called most often is " + mostFrequentUser + " with " + maxCount + " calls.";
document.getElementById("output").innerHTML = output;


}
