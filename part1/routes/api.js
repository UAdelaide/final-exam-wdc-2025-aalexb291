var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// Connect snippet adapted from ExpressJS documentation at https://expressjs.com/en/guide/database-integration.html#mysql
var connection = mysql.createConnection({
  database: 'DogWalkService'
});

connection.connect();
console.log("DB connect success!");
