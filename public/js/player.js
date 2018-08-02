teamIdList = {
  "Arizona_Cardinals":"de760528-1dc0-416a-a978-b510d20692ff",
  "Atlanta_Falcons":"e6aa13a4-0055-48a9-bc41-be28dc106929",
  "Baltimore_Ravens":"ebd87119-b331-4469-9ea6-d51fe3ce2f1c",
  "Buffalo_Bills":"768c92aa-75ff-4a43-bcc0-f2798c2e1724",
  "Carolina_Panthers":"f14bf5cc-9a82-4a38-bc15-d39f75ed5314",
  "Chicago_Bears":"7b112545-38e6-483c-a55c-96cf6ee49cb8",
  "Cincinnati_Bengals":"ad4ae08f-d808-42d5-a1e6-e9bc4e34d123",
  "Cleveland_Browns":"d5a2eb42-8065-4174-ab79-0a6fa820e35e",
  "Dallas_Cowboys":"e627eec7-bbae-4fa4-8e73-8e1d6bc5c060",
  "Denver_Broncos":"ce92bd47-93d5-4fe9-ada4-0fc681e6caa0",
  "Detroit_Lions":"c5a59daa-53a7-4de0-851f-fb12be893e9e",
  "Green_Bay_Packers":"a20471b4-a8d9-40c7-95ad-90cc30e46932",
  "Houston_Texans":"82d2d380-3834-4938-835f-aec541e5ece7",
  "Indianapolis_Colts":"82cf9565-6eb9-4f01-bdbd-5aa0d472fcd9",
  "Jacksonville_Jaguars":"f7ddd7fa-0bae-4f90-bc8e-669e4d6cf2de",
  "Kansas_City_Chiefs":"6680d28d-d4d2-49f6-aace-5292d3ec02c2",
  "Los_Angeles_Rams":"2eff2a03-54d4-46ba-890e-2bc3925548f3",
  "Los_Angeles_Chargers":"1f6dcffb-9823-43cd-9ff4-e7a8466749b5",
  "Miami_Dolphins":"4809ecb0-abd3-451d-9c4a-92a90b83ca06",
  "Minnesota_Vikings":"33405046-04ee-4058-a950-d606f8c30852",
  "New_England_Patriots":"97354895-8c77-4fd4-a860-32e62ea7382a",
  "New_Orleans_Saints":"0d855753-ea21-4953-89f9-0e20aff9eb73",
  "New_York_Giants":"04aa1c9d-66da-489d-b16a-1dee3f2eec4d",
  "New_York_Jets":"5fee86ae-74ab-4bdd-8416-42a9dd9964f3",
  "Oakland_Raiders":"1c1cec48-6352-4556-b789-35304c1a6ae1",
  "Philadelphia_Eagles":"386bdbf9-9eea-4869-bb9a-274b0bc66e80",
  "Pittsburgh_Steelers":"cb2f9f1f-ac67-424e-9e72-1475cb0ed398",
  "San_Francisco_49ers":"f0e724b0-4cbf-495a-be47-013907608da9",
  "Seattle_Seahawks":"3d08af9e-c767-4f88-a7dc-b920c6d2b4a8",
  "Tampa_Bay_Buccaneers":"4254d319-1bc7-4f81-b4ab-b5e6f3402b69",
  "Tennessee_Titans":"d26a1ca5-722d-4274-8f97-c92e49c96315",
  "Washington_Redskins":"22052ff7-c065-42ee-bc8f-c4691c50e624"
};
var underscoreTeam = "";
var underscorePlayer = "";
var displayTeam = "";
var displayPlayer = "";
var selectDefaultTeamDisabled = "Select another team...";
var selectDefaultPlayerDisabled = "...or select a player";
// The API object contains methods for each kind of request we'll make
var API = {
  getTeamList: function() {
    return $.ajax({
      url: "/teamlist",
      type: "GET"
    });
  },
  getPlayer: function() {
    return $.ajax({
      url: "player/:name",
      type: "GET"
    });
  }
};
API.getPlayer().then(function (res, req) {
  var thisURL = window.location.href;
  var urlArray = thisURL.split("/");
  var teamAndPlayerIndex = (urlArray.length - 1);
  var teamAndPlayer = urlArray[teamAndPlayerIndex];
  var teamAndPlayerArray = teamAndPlayer.split("&");
  underscoreTeam = teamAndPlayerArray[0]
  underscorePlayer = teamAndPlayerArray[1]
  playerId = teamAndPlayerArray[2]
  displayTeam = underscoreTeam.split("_").join(" ");
  displayPlayer = underscorePlayer.split("_").join(" ");
  $("#teamTitle").append("<h1><center><strong><i><font color='goldenrod'>" + displayTeam + "&nbsp;&nbsp;&nbsp;</font></i></strong></center></h1>");
  $("#pName").html(displayPlayer);

  var statsQueryUrl = "https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nfl/official/trial/v5/en/players/" + playerId + "/profile.json?api_key=azgb25e4z9m7rpw83g3fwvvc";
  $.ajax({
    url: statsQueryUrl,
    dataType: "json",
    method: "GET"
  }).then(function(response) {
    $("#pPos").html("Position: " + response.position);
    $("#pNumb").html("#" + response.jersey);
    var inches = (response.height).toFixed(0);
    var feet = Math.floor(inches / 12);
    inches %= 12;
    $("#pHeight").html("&nbsp;" + feet + "' " + inches + "''");
    $("#pWeight").html("&nbsp;" + response.weight);
    if (response.high_school) {
      $("#pHighSchool").html("&nbsp;" + response.high_school);
    }
    else {
      $("#pHighSchool").html("&nbsp;n/a");
    }
    $("#pCollege").html("&nbsp;" + response.college);
    if (response.draft) {
      $("#pDraftYear").html("&nbsp;" + response.draft.year);
      $("#pDraftRound").html("&nbsp;" + response.draft.round);
    }
    else {
      $("#pDraftYear").html("&nbsp;n/a");
      $("#pDraftRound").html("&nbsp;n/a");
    }
    
    $("#pRookYear").html("&nbsp;" + response.rookie_year);
    for (var s = 0; s < response.seasons.length; s++){
      for (var y = 0; y < response.seasons[s].teams.length; y++) {
        var gameType = "";
        if (response.seasons[s].type === "REG") {
          gameType = "Regular"
        }
        else if (response.seasons[s].type === "PST") {
          gameType = "Playoffs"
        }
        else {
          gameType = response.seasons[s].type 
        }
        var passingHtml = "<tr>" +
          "<td>" + response.seasons[s].year + "</td>" +
          "<td>" + response.seasons[s].teams[y].name + "</td>" +
          "<td>" + gameType + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.games_played + "</td>";
        var rushingHtml = passingHtml;
        var receivingHtml = passingHtml;
        var defenseHtml = passingHtml;

        // PASSING
        if (response.seasons[s].teams[y].statistics.passing){
          passingHtml = passingHtml + "<td>" + response.seasons[s].teams[y].statistics.passing.attempts + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.passing.completions + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.passing.cmp_pct + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.passing.yards + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.passing.touchdowns + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.passing.interceptions + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.passing.rating + "</td></tr>";
        } else {
          passingHtml = passingHtml + 
          "<td>0</td>" +
          "<td>0</td>" +
          "<td>0</td>" +
          "<td>0</td>" +
          "<td>0</td>" +
          "<td>0</td>" +
          "<td>0</td></tr>"
        }
        $("#passing").append(passingHtml);

        // RUSHING
        if (response.seasons[s].teams[y].statistics.rushing){
          rushingHtml = rushingHtml + "<td>" + response.seasons[s].teams[y].statistics.rushing.attempts + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.rushing.yards + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.rushing.avg_yards + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.rushing.longest + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.rushing.touchdowns + "</td></tr>";
        } else {
          rushingHtml = rushingHtml + 
          "<td>0</td>" +
          "<td>0</td>" +
          "<td>0</td>" +
          "<td>0</td>" +
          "<td>0</td></tr>"
        }
        $("#rushing").append(rushingHtml);

         // RECEIVING
         if (response.seasons[s].teams[y].statistics.receiving){
          receivingHtml = receivingHtml + "<td>" + response.seasons[s].teams[y].statistics.receiving.receptions + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.receiving.yards + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.receiving.avg_yards + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.receiving.longest + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.receiving.touchdowns + "</td></tr>";
        } else {
          receivingHtml = receivingHtml + 
          "<td>0</td>" +
          "<td>0</td>" +
          "<td>0</td>" +
          "<td>0</td>" +
          "<td>0</td></tr>"
        }
        $("#receiving").append(receivingHtml);

        // DEFENSE
        if (response.seasons[s].teams[y].statistics.defense){
          defenseHtml = defenseHtml + "<td>" + response.seasons[s].teams[y].statistics.defense.tackles + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.defense.assists + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.defense.sacks + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.defense.interceptions + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.defense.passes_defended + "</td>" +
          "<td>" + response.seasons[s].teams[y].statistics.defense.forced_fumbles + "</td></tr>";
         } else {
          defenseHtml = defenseHtml + 
          "<td>0</td>" +
          "<td>0</td>" +
          "<td>0</td>" +
          "<td>0</td>" +
          "<td>0</td>" +
          "<td>0</td></tr>"
         }
        $("#defense").append(defenseHtml);
        
        var nflTeams = [];
        var t = 0;
        var buildTeamList = function buildTeamList() {
          API.getTeamList().then(function(data) {
            var $teams = data.map(function(team) {
              // // build array of team names from the Database
              // $(".my-list").append(team.team_name + "<br>");
              nflTeams[t] = team.team_name;
              t++;
              // populate background
              if (underscoreTeam == team.team_long_id) {
                var backgroundURL = team.display_url;
                document.body.style.backgroundImage = "url('" + backgroundURL + "')";
                document.body.style.backgroundSize = "100%";
              }
              if (t > 32) {
                // *** USER TEAM DROPDOWN ***
                var teamListHtml = "<select class='selectTeam' style='background-color: black; color: goldenrod;'>" +
                "<option class='teamPicked' value='" + selectDefaultTeamDisabled + "'>" + selectDefaultTeamDisabled + "</option>";
                // populate team dropdown from array
                for (var i = 0; i < nflTeams.length; i++) {
                  if (nflTeams[i] != "NFL") {
                    teamListHtml = teamListHtml + "<option class='teamPicked' value='" + nflTeams[i] + "'>" + nflTeams[i] + "</option>";
                  }
                };
                teamListHtml = teamListHtml + "</select>";
                // send team dropdown list to the screen
                $("#nflTeamDropdown").html(teamListHtml);
              }
            });
          });
        };
        buildTeamList();
        


      }
    }
});

  var teamID = teamIdList[underscoreTeam];
  var playerQueryUrl = "https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nfl/official/trial/v5/en/teams/" + teamID + "/full_roster.json?api_key=azgb25e4z9m7rpw83g3fwvvc";
  var playerList = [];
  var playerIdString = [];
  $.ajax({
    url: playerQueryUrl,
    dataType: "json",
    method: "GET"
  }).then(function(response) {
    var x = 0;
    for (var p = 0; p < response.players.length; p++) {
      if (response.players[p].jersey != 0) {
        if (response.players[p].name.indexOf("'") <= -1) {
        playerList[x] = response.players[p].name +
          ": #" + response.players[p].jersey + 
          ", " + response.players[p].position;
        playerIdString[x] = underscoreTeam + "&" + response.players[p].name.split(" ").join("_") + "&" + response.players[p].id;
        x++;
        }
      }  
    };
    for ($i = 0; $i < playerList.length; $i++) {
      for ($j = playerList.length-1; $j > $i; $j--) {
        if (playerList[$j] < playerList[$j-1]) {
          $t = playerList[$j];
          $u = playerIdString[$j];
          playerList[$j] = playerList[$j-1];
          playerIdString[$j] = playerIdString[$j-1];
          playerList[$j-1] = $t;
          playerIdString[$j-1] = $u;
        }
      }
    };
    var playerListHtml = "<select class='selectPlayer' style='background-color: black; color: goldenrod;'>" +
    "<option class='playerPicked' value='" + selectDefaultPlayerDisabled + "'>&nbsp;" + selectDefaultPlayerDisabled + "</option>";
    for (var p = 0; p < playerList.length; p++) {
      playerListHtml = playerListHtml + "<option class='playerPicked' value='" + playerIdString[p] + "'>" + playerList[p] + "</option>";
    }
    playerListHtml = playerListHtml + "</select>";
    $("#nflPlayerDropdown").html(playerListHtml);
  });
     // ---Player news
  //Set and log the query url;
  var playerPlus = displayPlayer.split(" ").join("+")
  var teamPlus =  displayTeam.split(" ").join("+")
  var playerQueryURL = 'https://newsapi.org/v2/everything?sources=espn&q=' + playerPlus + "+" + teamPlus + '&apiKey=3779a757d4bf4ef2ae792c89d896c0d9';
    //Send Ajax
    $.ajax({
        url: playerQueryURL,
        dataType: "json",
        method: "GET"
    }).then(function(response) {  
        var playerResults = response;
        var playerNewsCount = 0;
        var teamNewsCount = 0;
        if (playerResults){
          playerNewsCount = playerResults.totalResults;
          if (playerNewsCount < 3) {
            teamNewsCount = 3 - playerNewsCount;
          }
          var breakVar = "";
          for (var i = 0; i < playerResults.articles.length; i++) {
            $("#news").append(breakVar + "<a href=" + playerResults.articles[i].url + " target='blank'>" + playerResults.articles[i].title + "</a>");
            breakVar = "<br><br>";
            if (i >=2) {
              i = playerResults.articles.length;
            }
          }
          if (teamNewsCount > 0) {
            //player didn't have enough headlines, so get team articles and append
            var newsQueryURL = 'https://newsapi.org/v2/everything?sources=espn&q=' + teamPlus + '&apiKey=3779a757d4bf4ef2ae792c89d896c0d9';
            //Send Ajax
            $.ajax({
                url: newsQueryURL,
                dataType: "json",
                method: "GET"
            }).then(function(response) { 
              var teamResults = response;
              if (teamResults){
                for (var i = 0; i < teamResults.articles.length; i++) {
                  $("#news").append(breakVar + "<a href=" + teamResults.articles[i].url + " target='blank'>" + teamResults.articles[i].title + "</a>");
                  breakVar = "<br><br>";
                  if (i >= teamNewsCount - 1) {
                    i = teamResults.articles.length;
                  }
                }
              };
            });
          }
        }
    else {
      $("#news").append("Sorry, no recent headlines for " + displayPlayer + ".");
    }
  });
});

$(document).on("change", ".selectTeam", function(event) {
  // retrieve the selected team from dropdown list
  selectedTeam = this.options[event.target.selectedIndex].value;
  // ignore 'select a team', only use selection if actual team is selected
  if (selectedTeam !== selectDefaultTeamDisabled) {
    var selectedTeamUnderscore = selectedTeam.split(" ").join("_");
    window.location.href = "/team/" + selectedTeamUnderscore;
  }
});
$(document).on("change", ".selectPlayer", function(event) {
  selectedPlayer = this.options[event.target.selectedIndex].value;
  // ignore default select, only use if an actual team is selected
  if (selectedPlayer !== selectDefaultPlayerDisabled) {
    var selectedPlayerUnderscore = selectedPlayer.split(" ").join("_");
    window.location.href = "/player/" + selectedPlayerUnderscore;
  }
});