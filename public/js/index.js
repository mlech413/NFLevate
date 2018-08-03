nflTeams = [
];

var selectedTeam = "";
var selectedTeamWithPlus = "";
var selectedTeamWithUnderscore = "";
var selectDefaultDisabled = "Select a team!";

// When team dropdown is selected
$(document).on("change", ".selectTeam", function(event) {
  // retrieve the selected team from dropdown list
  selectedTeam = this.options[event.target.selectedIndex].value;
  // ignore 'select a team', only use selection if actual team is selected
  if (selectedTeam !== selectDefaultDisabled) {
    // Populate selectedTeamPlus: convert 'State Name' to 'State+Name'
    selectedTeamWithPlus = selectedTeam.split(" ").join("+");
    selectedTeamWithUnderscore = selectedTeam.split(" ").join("_");
    while (selectedTeamWithUnderscore.charAt(0) === "_") {
      selectedTeamWithUnderscore = selectedTeamWithUnderscore.substr(1);
    }
    window.location.href = "/team/" + selectedTeamWithUnderscore;
  }
});


// The API object contains methods for each kind of request we'll make
var API = {
  getTeams: function() {
    return $.ajax({
      url: "api/teams",
      type: "GET"
    });
  }
};

// Build team dropdown list
var t = 0;
var buildTeamList = function buildTeamList() {
  API.getTeams().then(function(data) {
    var $teams = data.map(function(team) {
      // // build array of team names from the Database
      nflTeams[t] = team.team_name;
      t++;
      if (t > 31) {
        // *** USER PICKS A TEAM ***
        var teamListHtml = "<select class='selectTeam'>" +
        "<option class='teamPicked' value='" + selectDefaultDisabled + "'>" + selectDefaultDisabled + "</option>";
        // populate team dropdown from array
        for (var i = 0; i < nflTeams.length; i++) {
          teamListHtml = teamListHtml + "<option class='teamPicked' value='" + nflTeams[i] + "'>" + nflTeams[i] + "</option>";
        };
        teamListHtml = teamListHtml + "</select>";
        // send team dropdown list to the screen
        $("#nflTeamDropdown1").html(teamListHtml);
      }
    });
  });
};
buildTeamList();