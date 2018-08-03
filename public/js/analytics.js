var selectDefaultTeamDisabled = "Select another team...";
var selectDefaultPlayerDisabled = " ...or select a player";

var teamIdList = $("#getTeamIdList").attr("data-value");
var projectionList = $("#getProjectionList").attr("data-value");
// Get a background image
document.body.style.backgroundImage = "url('http://www.wallpapersshock.com/uploads/large/nfl-logo/nfl-logo-grass-background-wallpaper.jpg')";
document.body.style.backgroundSize = "100%";
document.body.style.backgroundAttachment = "fixed";

// get projection text from the Database, comes in as a string so parse and put into arrays
var teamIdArray = teamIdList.split("***,");
var projectionArray = projectionList.split("***,");

// loop through database of all the teams, and write out each associated paragraph also from the database
for (i = 0; i < teamIdArray.length; i++) {
  $("#" + teamIdArray[i]).html(projectionArray[i]);
};
