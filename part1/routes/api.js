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

  } catch (err) {
    console.error('Error setting up database. Ensure Mysql is running: service mysql start', err);
  }
})();

router.get('/', function(req, res, next) {
  res.status(200).send('Success');
});

// using async in route handler because of mysql2/promise
// using mysql2/promise as that is what was used in starthere/app.js

router.get('/dogs', async (req, res) => {
    try {
        const query = `
            SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username
            FROM Dogs
            JOIN Users ON Dogs.owner_id = Users.user_id;
        `;

        const [result] = await db.query(query);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch dogs' });
    }
});

router.get('/walkrequests/open', async (req, res) => {
    try {
        const query = `
            SELECT WalkRequests.request_id, Dogs.name AS dog_name, WalkRequests.requested_time, WalkRequests.duration_minutes, WalkRequests.location, Users.username AS owner_username
            FROM WalkRequests
            JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id
            JOIN Users ON Dogs.owner_id = Users.user_id
            WHERE WalkRequests.status='open';
        `;

        const [result] = await db.query(query);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch walk requests' });
    }
});

router.get('/walkers/summary', async (req, res) => {
    try {
        const query = `
            SELECT Users.user_id AS walker_username, COUNT(WalkRatings.request_id) AS total_ratings, AVG(WalkRatings.rating) AS average_rating, COUNT(WalkRatings.request_id) AS completed_walks
            FROM WalkRatings
            JOIN Users ON WalkRatings.walker_id = Users.user_id
            GROUP BY WalkRatings.walker_id, Users.username;
        `;

        const [result] = await db.query(query);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch walker summary' });
    }
});

module.exports = router;

