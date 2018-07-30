nflTeams = [
  // "Select a team",
  // "Arizona Cardinals",
  // "Atlanta Falcons",
  // "Baltimore Ravens",
  // "Buffalo Bills",
  // "Carolina Panthers",
  // "Chicago Bears",
  // "Cincinnati Bengals",
  // "Cleveland Browns",
  // "Dallas Cowboys",
  // "Denver Broncos",
  // "Detroit Lions",
  // "Green Bay Packers",
  // "Houston Texans",
  // "Indianapolis Colts",
  // "Jacksonville Jaguars",
  // "Kansas City Chiefs",
  // "Los Angeles Chargers",
  // "Los Angeles Rams",
  // "Miami Dolphins",
  // "Minnesota Vikings",
  // "New England Patriots",
  // "New Orleans Saints",
  // "New York Giants",
  // "New York Jets",
  // "Oakland Raiders",
  // "Philadelphia Eagles",
  // "Pittsburgh Steelers",
  // "San Francisco 49ers",
  // "Seattle Seahawks",
  // "Tampa Bay Buccaneers",
  // "Tennessee Titans",
  // "Washington Redskins"
];

var selectedTeam = "";
var selectedTeamWithPlus = "";

$(document).on("change", ".selectTeam", function(event) {
  // retrieve the selected team from dropdown list
  selectedTeam = this.options[event.target.selectedIndex].value;
  // ignore 'select a team', only use selection if actual team is selected
  if (selectedTeam !== "Or pick a specific team!") {
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
      // build array of team names from the Database
      $(".my-list").append(team.team_name + "<br>");
      nflTeams[t] = team.team_name;
      t++;
      if (t > 31) {
        // *** USER PICKS A TEAM ***
        var teamListHtml = "<select class='selectTeam'>" +
        "<option class='teamPicked' value='or pick a specific team!'>Or pick a specific team!</option>";
        // populate team dropdown from array
        for (var i = 0; i < nflTeams.length; i++) {
          teamListHtml = teamListHtml + "<option class='teamPicked' value='" + nflTeams[i] + "'>" + nflTeams[i] + "</option>";
        };
        teamListHtml = teamListHtml + "</select>";
        // send team dropdown list to the screen
        $("#nflTeamDropdown").append(teamListHtml);
      }
    });
  });
};
buildTeamList();

// var listTeams = function() {
//   API.getTeams().then(function(data) {
//     var $teams = data.map(function(team) {
//       var $a = $("<a>")
//         .text(team.text)
//         .attr("href", "/team/" + team.team_long_id);
//       console.log("team.team_name=" + team.team_name);
//       $(".my-list").append(team.team_name);
//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item1",
//           "team-list": team.team_name
//         })
//         .append($a);

//       return $li;
//     });

//     $teamList.empty();
//     $teamList.append($teams);
//   });
// };
// listTeams();

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
