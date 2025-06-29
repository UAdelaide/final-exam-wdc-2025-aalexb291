const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Middleware
app.use(session({
    name: 'sessionCookie',
    secret: 'its-a-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/users', userRoutes); // route changed to just /users for more consistency with existing AJAX requests

// Export the app instead of listening here
module.exports = app;
