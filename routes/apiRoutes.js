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

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
