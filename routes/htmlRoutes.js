var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Nfl_teams.findAll({}).then(function(dbAllTeams) {
      res.render("index", {
        teamList: dbAllTeams
      });
    });
  });

    // Load team list on team page
    app.get("/teamlist", function(req, res) {
      db.Nfl_teams.findAll({}).then(function(dbAllTeams) {
        res.send(dbAllTeams);
      });
    });

  // Load team page and pass in an team by id
  app.get("/team/:name", function(req, res) {
    db.Nfl_teams.findOne({ where: { team_long_id: req.params.name } }).then(function(dbTeam) {
      // console.log("req.params.name=" + req.params.name );
      // console.log(dbTeam.dataValues);
      res.render("team", {
        teamRow: dbTeam.dataValues,
        teamName: dbTeam.dataValues.team_name,
        teamLongId: dbTeam.dataValues.team_long_id,
        displayUrl: dbTeam.dataValues.display_url,
        apiTeamAccessId: dbTeam.dataValues.api_team_access_id,
        twitterHandle: dbTeam.dataValues.twitter_handle
      });
    });
  });

  app.get("/team", function(req, res) {
      res.render("team")
  });

    // Load team list on team page
    app.get("/analytics", function(req, res) {
      db.Nfl_teams.findAll({}).then(function(dbAllProjections) {
        var teamIdArray = [];
        var projectionsArray = [];
        for (var i = 0; i < dbAllProjections.length; i++){
          teamIdArray.push(dbAllProjections[i].team_long_id + "***");
          projectionsArray.push(dbAllProjections[i].projection + "***");
        }
        console.log(projectionsArray);
        console.log(teamIdArray);
        res.render("analytics", { 
          projectionList : projectionsArray,
          teamIdList: teamIdArray
        });
      });
    });

  app.get("/player/:name?", function(req, res) {
    return res.render("player", { name: req.params.name });

  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
