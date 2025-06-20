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

/*  Adapted code snippet from /starthere/app.js
    Simply runs both SQL query files in /database
    This satisfies the requirement to:
        "Insert records into the database on startup to allow for testing."
*/
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

    // Connect to the newly created and populated DogWalkService db
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'DogWalkService',
      // this is required to run both sql files without splitting them up
      multipleStatements: true
    });

    // Insert all test data from /database/insertqueries.sql
    await db.query(insertQuery);

  } catch (err) {
    console.error('Error setting up database. Ensure Mysql is running: service mysql start', err);
  }
})();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DogWalkService'
});

router.get('/', function(req, res, next) {
  res.status(200).send('Success');
});

// using async in route handler because of mysql2/promise
// using mysql2/promise as that is what was used in starthere/app.js

router.get('/dogs', async (req, res) => {
    try {
        const query = `
            SELECT Dogs.name, Dogs.size, Users.username
            FROM Dogs
            JOIN Users ON Dogs.owner_id = Users.user_id;
        `;

        const [result] = await connection.query(query);
        res.json(result);
    } catch (error) {
        res.status(500);
    }

});

module.exports = router;

