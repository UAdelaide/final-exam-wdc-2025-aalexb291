var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  database: 'DogWalkService'
});

connection.connect();

