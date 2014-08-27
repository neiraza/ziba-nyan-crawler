var sequelize = require('sequelize');

// Connect to database
var connection = new sequelize('zibanyan', 'root', ''
    , { host: 'localhost', port: 3306 });

// Define models
var sites = connection.define('sites', {
  url: sequelize.TEXT,
  title: sequelize.STRING,
  link: sequelize.TEXT,
  linkTitle: sequelize.STRING
});

// Synchronize to database
connection.sync({ force: true });
