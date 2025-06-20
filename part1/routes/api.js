var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise');
var fs = require('fs');
var path = require('path');

// Locations of SQL query files
var dogwalks = path.join(__dirname, '..', 'database', 'dogwalks.sql');
var createQuery = fs.readFileSync(dogwalks, 'utf8');

var inserts = path.join(__dirname, '..', 'database', 'insertqueries.sql');
var insertQuery = fs.readFileSync(inserts, 'utf8');

let db;

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      // this is required to run both sql files without splitting them up
      // learned at https://medium.com/@johnkolo/how-to-run-multiple-sql-queries-directly-from-an-sql-file-in-node-js-part-1-dce1e6dd2def
      multipleStatements: true
    });

    // Delete existing db, then re-create it based on /database/dogwalks.sql
    // This includes creating all tables
    await connection.query(createQuery);
    await connection.end();

    // Connect to the DogWalkService db
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'DogWalkService',
      // this is required to run both sql files without splitting them up
      multipleStatements: true
    });

    // Insert all test data from /database/insertqueries.sql
    await db.query(insertQuery);

    // let query =`SELECT * From Users;`;

    await db.query('SELECT * FROM Users;');
  } catch (err) {
    console.error('Error setting up database. Ensure Mysql is running: service mysql start', err);
  }
})();

router.get('/', function(req, res, next) {
  res.status(200).send('Success');
});

module.exports = router;

