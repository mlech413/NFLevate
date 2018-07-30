nflWallpaper = {
  "Arizona_Cardinals": "https://50-best.com/images/nfl_team_wallpapers/arizona_cardinals_wallpaper.jpg",
  "Atlanta_Falcons": "https://50-best.com/images/nfl_team_wallpapers/atlanta_falcons_wallpaper.jpg",
  "Baltimore_Ravens": "https://50-best.com/images/nfl_team_wallpapers/baltimore_ravens_wallpaper.jpg",
  "Buffalo_Bills": "https://50-best.com/images/nfl_team_wallpapers/buffalo_bills_wallpaper.jpg",
  "Carolina_Panthers": "https://50-best.com/images/nfl_team_wallpapers/carolina_panthers_wallpaper.jpg",
  "Chicago_Bears": "https://50-best.com/images/nfl_team_wallpapers/chicago_bears_wallpaper.jpg",
  "Cincinnati_Bengals": "https://50-best.com/images/nfl_team_wallpapers/cincinati_bengals_wallpaper.jpg",
  "Cleveland_Browns": "https://50-best.com/images/nfl_team_wallpapers/cleveland_browns_wallpaper.jpg",
  "Dallas_Cowboys": "https://50-best.com/images/nfl_team_wallpapers/dallas_cowboys_wallpaper.jpg",
  "Denver_Broncos": "https://50-best.com/images/nfl_team_wallpapers/denver_broncos_wallpaper.jpg",
  "Detroit_Lions": "https://50-best.com/images/nfl_team_wallpapers/detroit_lions_wallpaper.jpg",
  "Green_Bay_Packers": "https://50-best.com/images/nfl_team_wallpapers/green_bay_packers_wallpaper.jpg",
  "Houston_Texans": "https://50-best.com/images/nfl_team_wallpapers/houston_texans_wallpaper.jpg",
  "Indianapolis_Colts": "https://50-best.com/images/nfl_team_wallpapers/indianapolis_colts_wallpaper.jpg",
  "Jacksonville_Jaguars": "https://50-best.com/images/nfl_team_wallpapers/jacksonville_jaguars_wallpaper.jpg",
  "Kansas_City_Chiefs": "https://50-best.com/images/nfl_team_wallpapers/kansas_city_chiefs_wallpaper.jpg",
  "Los_Angeles_Chargers": "https://50-best.com/images/nfl_team_wallpapers/san_diego_chargers_wallpaper.jpg",
  "Los_Angeles_Rams": "https://50-best.com/images/nfl_team_wallpapers/st_louis_rams_wallpapers.jpg",
  "Miami_Dolphins": "https://50-best.com/images/nfl_team_wallpapers/miami_dolphins_wallpaper.jpg",
  "Minnesota_Vikings": "https://50-best.com/images/nfl_team_wallpapers/minnesota_vikings_wallpaper.jpg",
  "New_England_Patriots": "https://50-best.com/images/nfl_team_wallpapers/original_patriots_logo.jpg",
  "New_Orleans_Saints": "https://50-best.com/images/nfl_team_wallpapers/new_orlanes_saints_wallpaper.jpg",
  "New_York_Giants": "https://50-best.com/images/nfl_team_wallpapers/new_york_giants_wallpaper.jpg",
  "New_York_Jets": "https://50-best.com/images/nfl_team_wallpapers/new_york_jets_wallpaper.jpg",
  "NFL": "https://50-best.com/images/nfl_team_wallpapers/nfl_on_black_wallpaper.jpg",
  "Oakland_Raiders": "https://50-best.com/images/nfl_team_wallpapers/oakland_raiders_wallpaper.jpg",
  "Philadelphia_Eagles": "https://50-best.com/images/nfl_team_wallpapers/philadelphia_eagles_wallpaper.jpg",
  "Pittsburgh_Steelers": "https://50-best.com/images/nfl_team_wallpapers/pittsburgh_steelers_wallpaper.jpg",
  "San_Francisco_49ers": "https://50-best.com/images/nfl_team_wallpapers/san_francisco_49ers_wallpaper.jpg",
  "Seattle_Seahawks": "https://50-best.com/images/nfl_team_wallpapers/seattle_seahawks_wallpaper.jpg",
  "Tampa_Bay_Buccaneers": "https://pre00.deviantart.net/0794/th/pre/f/2014/173/2/1/tampa_bay_buccaneers_by_beaware8-d7nhi97.jpg",
  "Tennessee_Titans": "https://50-best.com/images/nfl_team_wallpapers/tennessee_titans_wallpaper.jpg",
  "Washington_Redskins": "https://50-best.com/images/nfl_team_wallpapers/washington_redskins_wallpaper.jpg"
};


// console.log("req=" + JSON.stringify(req));
// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  getTeams: function() {
    return $.ajax({
      url: "teams/:name",
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
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};
API.getTeams().then(function (res, req) {
  console.log(res);
  var thisURL = window.location.href;
  var urlArray = thisURL.split("/");
  var teamIndex = (urlArray.length - 1);
  console.log(urlArray[teamIndex]);
  var backgroundTeam = urlArray[teamIndex];
  var backgroundURL = nflWallpaper[backgroundTeam];
  console.log(backgroundURL);
  // document.body.style.background = "url('" + backgroundURL + "') center";
  document.body.style.backgroundImage = "url('" + backgroundURL + "')";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundSize = "100%";
  });
// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
 
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
