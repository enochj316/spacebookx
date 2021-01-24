const express = require('express');

const router = express.Router();

// Import the model (users.js) to use its database functions.
const users = require('../models/users.js');

// Create all our routes and set up logic within those routes where required.
/* router.get('/', (req, res) => {
  users.all((data) => {
    const hbsObject = {
      cats: data,
    };
    console.log(hbsObject);
    res.render('user', hbsObject);
   });
}); */

// Export routes for server.js to use.
module.exports = router;