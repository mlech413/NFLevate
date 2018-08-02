nflTeams = [
];

var selectedTeam = "";
var selectedTeamWithPlus = "";
var selectedTeamWithUnderscore = "";
var selectDefaultDisabled = "Select a team!";

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

// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var $teamList = $("#team-list");

// The API object contains methods for each kind of request we'll make
var API = {
  getTeams: function() {
    return $.ajax({
      url: "api/teams",
      type: "GET"
    });
  },
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

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
        $("#nflTeamDropdown").html(teamListHtml);
      }
    });
  });
};
buildTeamList();