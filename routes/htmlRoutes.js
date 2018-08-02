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
  app.get("/eagles", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/eagles.png'))
  });
  app.get("/patriots", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/patriots.png'))
  });
  app.get("/rams", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/rams.png'))
  });
  app.get("/vikings", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/vikings.png'))
  });
  app.get("/steelers", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/steelers.png'))
  });
  app.get("/falcons", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/falcons.png'))
  });
  app.get("/saints", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/saints.png'))
  });
  app.get("/jaguars", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/jaguars.png'))
  });
  app.get("/chiefs", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/chiefs.png'))
  });
  app.get("/packers", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/packers.png'))
  });
  app.get("/giants", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/giants.png'))
  });
  app.get("/chargers", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/chargers.png'))
  });
  app.get("/texans", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/texans.png'))
  });
  app.get("/titans", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/titans.png'))
  });
  app.get("/panthers", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/panthers.png'))
  });
  app.get("/niners", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/49ers.png'))
  });
  app.get("/lions", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/lions.png'))
  });
  app.get("/bears", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/bears.png'))
  });
  app.get("/seahawks", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/seahawks.png'))
  });
  app.get("/colts", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/colts.png'))
  });
  app.get("/broncos", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/broncos.png'))
  });
  app.get("/cardinals", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/cardinals.png'))
  });
  app.get("/jets", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/jets.png'))
  });
  app.get("/redskins", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/redskins.png'))
  });
  app.get("/ravens", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/ravens.png'))
  });
  app.get("/bengals", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/bengals.png'))
  });
  app.get("/buccaneers", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/buccaneers.png'))
  });
  app.get("/raiders", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/raiders.png'))
  });
  app.get("/dolphins", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/dolphins.png'))
  });
  app.get("/bills", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/bills.png'))
  });
  app.get("/browns", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/browns.png'))
  });
  app.get("/cowboys", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/cowboys.png'))
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
