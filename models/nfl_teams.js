module.exports = function(sequelize, DataTypes) {
  var Nfl_teams = sequelize.define("Nfl_teams", {
    team_long_id: DataTypes.STRING,
    team_name: DataTypes.STRING,
    display_url: DataTypes.STRING,
    api_team_access_id: DataTypes.STRING,
    twitter_handle: DataTypes.STRING,
    projection: DataTypes.TEXT
  });
  return Nfl_teams;
};
