var db = require("../models");

module.exports = function(app) {
  // Get all teams
  app.get("/api/teams", function(req, res) {
    db.Nfl_teams.findAll({}).then(function(dbAllTeams) {
      res.json(dbAllTeams);
    });
  });

  // Get all examples
  app.get("/api/team/:name", function(req, res) {
    db.Nflevate.findAll({}).then(function(oneTeam) {
      res.json(oneTeam);
    });
  });
};