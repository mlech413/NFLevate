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
    return res.render("team", { name: req.params.name });
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
