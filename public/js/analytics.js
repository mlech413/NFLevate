var selectDefaultTeamDisabled = "Select another team...";
var selectDefaultPlayerDisabled = " ...or select a player";

var teamIdList = $("#getTeamIdList").attr("data-value");
var projectionList = $("#getProjectionList").attr("data-value");
document.body.style.backgroundImage = "url('http://www.wallpapersshock.com/uploads/large/nfl-logo/nfl-logo-grass-background-wallpaper.jpg')";
document.body.style.backgroundSize = "100%";



var teamIdArray = teamIdList.split("***,");
var projectionArray = projectionList.split("***,");

console.log(projectionArray)
console.log(teamIdArray)

for (i = 0; i < teamIdArray.length; i++) {
  $("#" + teamIdArray[i]).html(projectionArray[i]);
};
