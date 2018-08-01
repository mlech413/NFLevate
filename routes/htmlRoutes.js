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

  // Load team page and pass in an team by id
  app.get("/team/:name?", function(req, res) {
    db.Nfl_teams.findOne({ where: { team_long_id: req.params.name } }).then(function(dbTeam) {
      console.log("req.params.name=" + req.params.name );
      console.log(dbTeam.dataValues.team_name);
      res.render("team", {
        teamRow: dbTeam.dataValues,
        teamName: dbTeam.dataValues.team_name,
        teamLongId: dbTeam.dataValues.team_long_id,
        displayUrl: dbTeam.dataValues.display_url,
        apiTeamAccessId: dbTeam.dataValues.api_team_access_id,
      });
    });
   // return res.render("team", { name: req.params.name });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id?", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
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
