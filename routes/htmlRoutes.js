var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  app.get("/", function(req, res) {
    db.Nfl_teams.findAll({}).then(function(dbAllTeams) {
      res.render("index", {
        // msg: "Example text",
        teamList: dbAllTeams
      });
    });
  });




  // Load example page and pass in an example by id
  app.get("/example/:id?", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Load example page and pass in an example by id
  // app.get("/team/:name?", function(req, res) {
  //   db.Nflevate.findOne({ where: { name: req.params.name } }).then(function(dbNflevate) {
  //     res.render("name", {
  //       name: dbNflevate
  //     });
  //   });
  // });

  // Load team page and pass in an team by id
  app.get("/team/:name?", function(req, res) {
    //console.log(req.params);
    // res.json(req.params.name);
    return res.render("team", { name: req.params.name });
    // res.render("team");
    // res.json(req.params.name);
  });

  app.get("/player/:name?", function(req, res) {
    return res.render("player", { name: req.params.name });

  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
