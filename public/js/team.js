var selectDefaultTeamDisabled = "Select a team...";
var selectDefaultPlayerDisabled = " ...or select a player";

// The API object contains methods for each kind of request we'll make
var API = {
  getTweets: function() {
    return $.ajax({
      url: "/api/tweets",
      type: "GET"
    });
  },
  getTeamList: function() {
    return $.ajax({
      url: "/teamlist",
      type: "GET"
    });
  },
  getTeams: function() {
    return $.ajax({
      url: "teams/:name",
      type: "GET"
    });
  }
};
var loadingHtml = "<div class='card' style='opacity: 0.85; height: 222px;' id='logo-card-section'>" +
                    "<div class='card-body'>" +
      "<center><img src='../img/football_loading.gif' style=' max-width: 80%;'></center>" +
    "</div>" +
    "</div>"
    $("#teamLogo").html(loadingHtml);

API.getTeams().then(function (res, req) {
  var displayTeam = $("#getTeamName").attr("data-value");
  var teamLongId = $("#getTeamLongId").attr("data-value");
  var backgroundURL = $("#getDisplayUrl").attr("data-value");
  var teamID = $("#getApiTeamAccessId").attr("data-value");
  document.body.style.backgroundImage = "url('" + backgroundURL + "')";
  document.body.style.backgroundSize = "100%";
  document.body.style.backgroundAttachment = "fixed";

  if (teamLongId === "NFL") {
    teamID = "de760528-1dc0-416a-a978-b510d20692ff"
  };

    // var playerQueryUrl = "https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nfl/official/trial/v5/en/teams/" + teamID + "/full_roster.json?api_key=wgxf9r4gm79q5rxrujh356tc"; // Mark API
    var playerQueryUrl = "https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nfl/official/trial/v5/en/teams/" + teamID + "/full_roster.json?api_key=azgb25e4z9m7rpw83g3fwvvc"; // Vale API

    // var playerQueryUrl = "https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nfl/official/trial/v5/en/teams/" + teamID + "/full_roster.json?api_key=" + process.env.SPORTRADAR_API_KEY;

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
          playerIdString[x] = teamLongId + "&" + response.players[p].name.split(" ").join("_") + "&" + response.players[p].id;
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

    var nflTeams = [];
    var t = 0;
    // var buildTeamList = function buildTeamList() {
      API.getTeamList().then(function(data) {
        var $teams = data.map(function(team) {

          // // build array of team names from the Database
          // $(".my-list").append(team.team_name + "<br>");
          nflTeams[t] = team.team_name;
          t++;
          if (t > 32) {
            // *** USER PICKS A TEAM ***
            var teamListHtml = "<select class='selectTeam' style='background-color: black; color: goldenrod;'>" +
            "<option class='teamPicked' value='" + selectDefaultTeamDisabled + "'>" + selectDefaultTeamDisabled + "</option>";
            // populate team dropdown from array
            for (var i = 0; i < nflTeams.length; i++) {
              if (nflTeams[i] !== "NFL") {
                teamListHtml = teamListHtml + "<option class='teamPicked' value='" + nflTeams[i] + "'>" + nflTeams[i] + "</option>";
              }
            };
            teamListHtml = teamListHtml + "</select>";
            // send team dropdown list to the screen
            $("#nflTeamDropdown").html(teamListHtml);
          }
        });
      });
    // };
    // buildTeamList();

    if (teamLongId != "NFL") {
      var playerListHtml = "<select class='selectPlayer' style='background-color: black; color: goldenrod;'>" +
      "<option class='playerPicked' value='" + selectDefaultPlayerDisabled + "'>&nbsp;&nbsp;" + selectDefaultPlayerDisabled + "</option>";
      for (var p = 0; p < playerList.length; p++) {
        // $("#navbarDropdown2").append("<a class='dropdown-item playerPicked2' value='" + playerList[p] + "' href='#'>" + playerList[p] + "</a>")
        // $("#navbarDropdown2").append("<option class='dropdown-item playerPicked2' value='" + playerList[p] + "'>" + playerList[p] + "</option>")
        playerListHtml = playerListHtml + "<option class='playerPicked' value='" + playerIdString[p] + "'>" + playerList[p] + "</option>";
      }
      playerListHtml = playerListHtml + "</select>";
      $("#nflPlayerDropdown").html(playerListHtml);
      // $("#navbarDropdown2").html(playerListHtml);
      $("#teamTitle").append("<h2><i><font color='goldenrod'>&nbsp;" + displayTeam + "&nbsp;</span></font></i></h2>");

      $(document).on("change", ".selectPlayer", function(event) {
        selectedPlayer = this.options[event.target.selectedIndex].value;
        // ignore default select, only use if an actual team is selected
        if (selectedPlayer !== selectDefaultPlayerDisabled) {
          window.location.href = "/player/" + selectedPlayer;
        }
      });
    }
    $(document).on("change", ".selectTeam", function(event) {
      // retrieve the selected team from dropdown list
      selectedTeam = this.options[event.target.selectedIndex].value;
      // ignore 'select a team', only use selection if actual team is selected
      if (selectedTeam !== selectDefaultTeamDisabled) {
        var selectedTeamUnderscore = selectedTeam.split(" ").join("_");
        window.location.href = "/team/" + selectedTeamUnderscore;
      }
    });

    // OLD SECTION STOP
  });  


  // ---Logo Pic
  if (teamLongId === "NFL") {
    var dispImg = "http://www.stickpng.com/assets/images/5895deb9cba9841eabab6099.png"
    var teamLogoHtml = "<div class='card' style='opacity: 0.85; height: 222px;' id='logo-card-section'><div class='card-body'>" +
                        "<center><img src=" + dispImg + " style='max-width: 100%; max-height: 190px;'></center></div></div>";
    $("#teamLogo").html(teamLogoHtml);
  }
  else if (teamLongId === "Buffalo_Bills") {
    var dispImg = "https://s3.amazonaws.com/freebiesupply/large/2x/buffalo-bills-logo-transparent.png"
    var teamLogoHtml = "<div class='card' style='opacity: 0.85; height: 222px;' id='logo-card-section'><div class='card-body'>" +
                        "<center><img src=" + dispImg + " style='max-width: 100%; max-height: 190px;'></center></div></div>";
    $("#teamLogo").html(teamLogoHtml);
  }
  else if (teamLongId === "New_York_Giants") {
    var dispImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/New_York_Giants_logo.svg/2000px-New_York_Giants_logo.svg.png"
    var teamLogoHtml = "<div class='card' style='opacity: 0.85; height: 222px;' id='logo-card-section'><div class='card-body'>" +
                        "<center><img src=" + dispImg + " style='max-width: 100%; max-height: 190px;'></center></div></div>";
    $("#teamLogo").html(teamLogoHtml);
  }
  else if (teamLongId === "Tampa_Bay_Buccaneers") {
    var dispImg = "https://s3.amazonaws.com/freebiesupply/large/2x/tampa-bay-buccaneers-logo-transparent.png"
    var teamLogoHtml = "<div class='card' style='opacity: 0.85; height: 222px;' id='logo-card-section'><div class='card-body'>" +
                        "<center><img src=" + dispImg + " style='max-width: 100%; max-height: 190px;'></center></div></div>";
    $("#teamLogo").html(teamLogoHtml);
  }
  

  

  else {
    // Set and log the query url 
    var selectedTeamWithPlus = teamLongId.split("_").join("+")
    var teamLogoQueryURL = "https://cors-anywhere.herokuapp.com/https://api.duckduckgo.com/?q=" + selectedTeamWithPlus + "&format=json&pretty=1";
    // Send Ajax
    $.ajax({
        url: teamLogoQueryURL,
        dataType: "json",
        method: "GET"
    }).then(function(response) { 
      if (response.Image){
        var teamLogoHtml = "<div class='card' style='opacity: 0.85; height: 222px;' id='logo-card-section'>" +
                              "<div class='card-body'>" +
                                "<center><img src=" + response.Image + " style='max-width: 100%; max-height: 190px;'></center>" +
                              "</div>" +
                          "</div>";

        $("#teamLogo").html(teamLogoHtml);
      }
    })
  }

  // ---Team summary
  var wikiId = teamLongId;
  if (teamLongId === "NFL") {
    wikiId = "National_Football_League";
  };
  //Set and log the query url 
  var wikiQueryURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&origin=*&formatversion=2&titles='+ wikiId +''
  var urlForWikiLink = "https://www.wikipedia.org/";
    //Send Ajax
    $.ajax({
        url: wikiQueryURL,
        dataType: "json",
        method: "GET"
    }).then(function(response) { 
        var results = response.query.pages[0].extract;
    if (results){
      urlForWikiLink = "https://en.wikipedia.org/wiki/" + wikiId;
      $("#wiki").append(results + "<br><br><a href='" + urlForWikiLink + "' target='blank'>" + urlForWikiLink + "</a>");
    }
  });

   // ---Team news
  //Set and log the query url;
  var teamPlus = displayTeam.split(" ").join("+")
  var newsQueryURL = 'https://newsapi.org/v2/everything?sources=espn&q=' + teamPlus + '&apiKey=3779a757d4bf4ef2ae792c89d896c0d9';
  // var newsQueryURL = 'https://newsapi.org/v2/everything?sources=espn&q=' + teamPlus + '&apiKey=' + process.env.NEWS_API_KEY;
    //Send Ajax
    $.ajax({
        url: newsQueryURL,
        dataType: "json",
        method: "GET"
    }).then(function(response) {  
        var results = response;
    if (results){
      for (var i = 0; i < results.articles.length; i++) {
        $("#news").append("<a href=" + results.articles[i].url + " target='blank'>" + results.articles[i].title + "<br><br>");
        if (i >=8) {
          i = results.articles.length;
        }
      }
      
    }
  });

});