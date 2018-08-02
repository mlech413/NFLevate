var db = require("../models");
var path = require("path");

module.exports = function (app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  app.get("/", function (req, res) {
    db.Nfl_teams.findAll({}).then(function (dbAllTeams) {
      res.render("index", {
        // msg: "Example text",
        teamList: dbAllTeams
      });
    });
  });
  app.get("/analytics", function (req, res) {
    res.render("analytics")
  });
  app.get("/eagles", function (req, res) {
    res.sendFile(path.join(__dirname, '../eagles.png'))
  });
  app.get("/patriots", function (req, res) {
    res.sendFile(path.join(__dirname, '../patriots.png'))
  });
  app.get("/rams", function (req, res) {
    res.sendFile(path.join(__dirname, '../rams.png'))
  });
  app.get("/vikings", function (req, res) {
    res.sendFile(path.join(__dirname, '../vikings.png'))
  });
  app.get("/steelers", function (req, res) {
    res.sendFile(path.join(__dirname, '../steelers.png'))
  });
  app.get("/falcons", function (req, res) {
    res.sendFile(path.join(__dirname, '../falcons.png'))
  });
  app.get("/saints", function (req, res) {
    res.sendFile(path.join(__dirname, '../saints.png'))
  });
  app.get("/jaguars", function (req, res) {
    res.sendFile(path.join(__dirname, '../jaguars.png'))
  });
  app.get("/chiefs", function (req, res) {
    res.sendFile(path.join(__dirname, '../chiefs.png'))
  });
  app.get("/packers", function (req, res) {
    res.sendFile(path.join(__dirname, '../packers.png'))
  });
  app.get("/giants", function (req, res) {
    res.sendFile(path.join(__dirname, '../giants.png'))
  });
  app.get("/chargers", function (req, res) {
    res.sendFile(path.join(__dirname, '../chargers.png'))
  });
  app.get("/texans", function (req, res) {
    res.sendFile(path.join(__dirname, '../texans.png'))
  });
  app.get("/titans", function (req, res) {
    res.sendFile(path.join(__dirname, '../titans.png'))
  });
  app.get("/panthers", function (req, res) {
    res.sendFile(path.join(__dirname, '../panthers.png'))
  });
  app.get("/niners", function (req, res) {
    res.sendFile(path.join(__dirname, '../49ers.png'))
  });
  app.get("/lions", function (req, res) {
    res.sendFile(path.join(__dirname, '../lions.png'))
  });
  app.get("/bears", function (req, res) {
    res.sendFile(path.join(__dirname, '../bears.png'))
  });
  app.get("/seahawks", function (req, res) {
    res.sendFile(path.join(__dirname, '../seahawks.png'))
  });
  app.get("/colts", function (req, res) {
    res.sendFile(path.join(__dirname, '../colts.png'))
  });
  app.get("/broncos", function (req, res) {
    res.sendFile(path.join(__dirname, '../broncos.png'))
  });
  app.get("/cardinals", function (req, res) {
    res.sendFile(path.join(__dirname, '../cardinals.png'))
  });
  app.get("/jets", function (req, res) {
    res.sendFile(path.join(__dirname, '../jets.png'))
  });
  app.get("/redskins", function (req, res) {
    res.sendFile(path.join(__dirname, '../redskins.png'))
  });
  app.get("/ravens", function (req, res) {
    res.sendFile(path.join(__dirname, '../ravens.png'))
  });
  app.get("/bengals", function (req, res) {
    res.sendFile(path.join(__dirname, '../bengals.png'))
  });
  app.get("/buccaneers", function (req, res) {
    res.sendFile(path.join(__dirname, '../buccaneers.png'))
  });
  app.get("/raiders", function (req, res) {
    res.sendFile(path.join(__dirname, '../raiders.png'))
  });
  app.get("/dolphins", function (req, res) {
    res.sendFile(path.join(__dirname, '../dolphins.png'))
  });
  app.get("/bills", function (req, res) {
    res.sendFile(path.join(__dirname, '../bills.png'))
  });
  app.get("/browns", function (req, res) {
    res.sendFile(path.join(__dirname, '../browns.png'))
  });
  app.get("/cowboys", function (req, res) {
    res.sendFile(path.join(__dirname, '../cowboys.png'))
  });




  // Load example page and pass in an example by id
  app.get("/example/:id?", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
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
  app.get("/team/:name?", function (req, res) {
    //console.log(req.params);
    // res.json(req.params.name);
    return res.render("team", { name: req.params.name });
    // res.render("team");
    // res.json(req.params.name);
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
