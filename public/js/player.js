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
var selectDefaultDisabled = "Select a Player!";
// The API object contains methods for each kind of request we'll make
var API = {
  getPlayer: function() {
    return $.ajax({
      url: "player/:name",
      type: "GET"
    });
  }
  // saveExample: function(example) {
  //   return $.ajax({
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     type: "POST",
  //     url: "api/examples",
  //     data: JSON.stringify(example)
  //   });
  // },
  // getExamples: function() {
  //   return $.ajax({
  //     url: "api/examples",
  //     type: "GET"
  //   });
  // },
  // deleteExample: function (id) {
  //   return $.ajax({
  //     url: "api/examples/" + id,
  //     type: "DELETE"
  //   });
  // }
};
API.getPlayer().then(function (res, req) {
  // console.log("res=" + res);
  var thisURL = window.location.href;
  var urlArray = thisURL.split("/");
  var teamAndPlayerIndex = (urlArray.length - 1);
  // console.log("urlArray=" + urlArray);
  var teamAndPlayer = urlArray[teamAndPlayerIndex];
  var teamAndPlayerArray = teamAndPlayer.split("&");
  underscoreTeam = teamAndPlayerArray[0]
  underscorePlayer = teamAndPlayerArray[1]
  displayTeam = underscoreTeam.replace(/_/g, " ");
  displayPlayer = underscorePlayer.replace(/_/g, " ");
  $("#teamTitle").append("<h1><center><strong><i><font color='goldenrod'>" + displayTeam + "&nbsp;&nbsp;&nbsp;</font></i></strong></center></h1>");
  $("#pName").html(displayPlayer);

  var playerInfo = {};
  var teamID = teamIdList[underscoreTeam];
  // console.log("teamID=" + teamID);
  var playerQueryUrl = "https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nfl/official/trial/v5/en/teams/" + teamID + "/full_roster.json?api_key=azgb25e4z9m7rpw83g3fwvvc";
  console.log("CLICK LINK TO VIEW FULL JSON OBJECT: " + playerQueryUrl);
  $.ajax({
    url: playerQueryUrl,
    dataType: "json",
    method: "GET"
  }).then(function(response) {
    for (var p = 0; p < response.players.length; p++) {
      if (response.players[p].name == displayPlayer) {
        playerInfo = response.players[p]
        // console.log("playerInfo=" + JSON.stringify(playerInfo));
      }
    }
    $("#pPos").html("Position: " + playerInfo.position);
    $("#pNumb").html("#" + playerInfo.jersey);
    var inches = (playerInfo.height).toFixed(0);
    var feet = Math.floor(inches / 12);
    inches %= 12;
    console.log(playerInfo.height + "in = " + feet + "ft " + inches + "in");
    $("#pHeight").html("&nbsp;" + feet + "' " + inches + "''");
    $("#pWeight").html("&nbsp;" + playerInfo.weight);
    console.log("team=" + displayTeam);
    console.log("division=" + response.division.name);
    console.log("venue=" + response.venue.name);
    console.log("college=" + playerInfo.college);
    console.log("college conference=" + playerInfo.college_conf);
    console.log("rookie year=" + playerInfo.rookie_year);
    console.log("birth date=" + playerInfo.birth_date);

    var teamID = teamIdList[underscoreTeam];
    // console.log("teamID=" + teamID);
    var playerQueryUrl = "https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nfl/official/trial/v5/en/teams/" + teamID + "/full_roster.json?api_key=azgb25e4z9m7rpw83g3fwvvc";
    var playerList = [];
    $.ajax({
      url: playerQueryUrl,
      dataType: "json",
      method: "GET"
    }).then(function(response) {
      // console.log(response);
      var x = 0;
      for (var p = 0; p < response.players.length; p++) {
        if (response.players[p].jersey != 0) {
          if (response.players[p].name.indexOf("'") <= -1) {
          playerList[x] = response.players[p].name +
            ": #" + response.players[p].jersey + 
            ", " + response.players[p].position;
          // console.log("playerList[" + x + "]=" + playerList[x]);
          x++;
          }
        }  
      };
      for ($i = 0; $i < playerList.length; $i++) {
        for ($j = playerList.length-1; $j > $i; $j--) {
          if (playerList[$j] < playerList[$j-1]) {
            $t = playerList[$j];
            playerList[$j] = playerList[$j-1];
            playerList[$j-1] = $t;
          }
        }
      };
      var playerListHtml = "<select class='selectPlayer'>" +
      "<option class='playerPicked' value='" + selectDefaultDisabled + "'>" + selectDefaultDisabled + "</option>";
      for (var p = 0; p < playerList.length; p++) {
        playerListHtml = playerListHtml + "<option class='playerPicked' value='" + playerList[p] + "'>" + playerList[p] + "</option>";
      }
      // console.log("playerList=" + playerList)
      playerListHtml = playerListHtml + "</select>";
      // console.log(playerListHtml);
      $("#nflPlayerDropdown").html(playerListHtml);
      $(document).on("change", ".selectPlayer", function(event) {
        // retrieve the selected team from dropdown list
        selectedPlayer = this.options[event.target.selectedIndex].value;
        // ignore default select, only use selection if actual team is selected
        if (selectedPlayer !== selectDefaultDisabled) {
          // Populate selectedTeamPlus: convert 'State Name' to 'State+Name'
          selectedPlayerWithUnderscore = selectedPlayer.split(" ").join("_");
          selectedPlayerWithUnderscore = selectedPlayerWithUnderscore.split(':')[0];
        }
      });
    });
  });
});


// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function () {
 
//   API.getExamples().then(function (data) {
//     var $examples = data.map(function (example) {
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
// var handleFormSubmit = function (event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function () {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function () {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function () {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
