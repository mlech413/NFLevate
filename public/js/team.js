var selectDefaultDisabled = "Select a Player!";

// The API object contains methods for each kind of request we'll make
var API = {
  getTeams: function() {
    return $.ajax({
      url: "teams/:name",
      type: "GET"
    });
  }
};
API.getTeams().then(function (res, req) {
  var displayTeam = $("#getTeamName").attr("data-value");
  var teamLongId = $("#getTeamLongId").attr("data-value");
  var backgroundURL = $("#getDisplayUrl").attr("data-value");
  var teamID = $("#getApiTeamAccessId").attr("data-value");
  document.body.style.backgroundImage = "url('" + backgroundURL + "')";
  document.body.style.backgroundSize = "100%";
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
        playerIdString[x] = teamLongId + "&" + response.players[p].name.replace(" ","_") +
          "&" + response.players[p].id;
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
    console.log(playerList);
    console.log(playerIdString);



    



    var playerListHtml = "<select class='selectPlayer'>" +
    "<option class='playerPicked' value='" + selectDefaultDisabled + "'>" + selectDefaultDisabled + "</option>";
    for (var p = 0; p < playerList.length; p++) {
      // $("#navbarDropdown2").append("<a class='dropdown-item playerPicked2' value='" + playerList[p] + "' href='#'>" + playerList[p] + "</a>")
      // $("#navbarDropdown2").append("<option class='dropdown-item playerPicked2' value='" + playerList[p] + "'>" + playerList[p] + "</option>")
      playerListHtml = playerListHtml + "<option class='playerPicked' value='" + playerIdString[p] + "'>" + playerList[p] + "</option>";
    }
    // console.log("playerList=" + playerList)
    playerListHtml = playerListHtml + "</select>";
    // console.log(playerListHtml);
    $("#nflPlayerDropdown").html(playerListHtml);
    // $("#navbarDropdown2").html(playerListHtml);
    $(document).on("change", ".selectPlayer", function(event) {
    // $(document).on("change", ".dropdown-menu", function(event) {
      // retrieve the selected team from dropdown list
      selectedPlayer = this.options[event.target.selectedIndex].value;
      // ignore default select, only use if an actual team is selected
      if (selectedPlayer !== selectDefaultDisabled) {
        // selectedPlayerWithUnderscore = selectedPlayer.split(" ").join("_");
        // selectedPlayerWithUnderscore = selectedPlayerWithUnderscore.split(':')[0];
        // window.location.href = "/player/" + teamLongId + "&" + selectedPlayerWithUnderscore;
        window.location.href = "/player/" + selectedPlayer;
      }
    });
  });
 
  // ---Team summary
  //Set and log the query url 
  var wikiQueryURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&origin=*&formatversion=2&titles='+ teamLongId +''
  var urlForWikiLink = "https://www.wikipedia.org/";
    //Send Ajax
    $.ajax({
        url: wikiQueryURL,
        dataType: "json",
        method: "GET"
    }).then(function(response) { 
        var results = response.query.pages[0].extract;
    if (results !== ""){
      urlForWikiLink = "https://en.wikipedia.org/wiki/" + teamLongId;
      $("#wiki").append(results + "<br><br><a href='" + urlForWikiLink + "' target='blank'>" + urlForWikiLink + "</a>");
    }
  });

   // ---Team news
  //Set and log the query url
  var teamPlus = displayTeam.replace(" ", "+");
  var newsQueryURL = 'https://newsapi.org/v2/everything?sources=espn&q=' + teamPlus + '&apiKey=3779a757d4bf4ef2ae792c89d896c0d9'
    //Send Ajax
    $.ajax({
        url: newsQueryURL,
        dataType: "json",
        method: "GET"
    }).then(function(response) {  
        var results = response;
    if (results !== ""){
      for (var i = 0; i < results.articles.length; i++) {
        $("#news").append("<a href=" + results.articles[i].url + " target='blank'>" + results.articles[i].title + "<br><br>");
        if (i >=8) {
          i = results.articles.length;
        }
      }
      
    }
  });

});