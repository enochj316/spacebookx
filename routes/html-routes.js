const db = require("../models")
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");

// HTML Routes ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = (app) => {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/user_id", isAuthenticated, (req, res) => {
        const exphbs = require('express-handlebars');

        app.engine('handlebars', exphbs({
            defaultLayout: '_user'
        }));
        app.set('view engine', 'handlebars');

        //find all where user id = req.user
        db.Posts.findAll().then((result) => {
            res.render('user', {result: result})
        })

        /*  // Import routes and give the server access to them.
        const routes = require('../controllers/user_controller');

        app.use(routes); */ 
    });

    app.get("/home_id", isAuthenticated, (req, res) => {
        console.log("home page hit!")
        const exphbs = require('express-handlebars');

        app.engine('handlebars', exphbs({
            defaultLayout: '_home'
        }));
        app.set('view engine', 'handlebars');

        //do a findAll posts, then pass result as object into render
        db.Posts.findAll().then((result) => {
            res.render('home', {result: result})
        })

    });

    app.get("/friends", isAuthenticated, (req, res) => {
        console.log("friends page hit!")
        const exphbs = require('express-handlebars');

        app.engine('handlebars', exphbs({
            defaultLayout: '_friends'
        }));
        app.set('view engine', 'handlebars');

        //change to db.Friends.findAll
        db.Friends.findAll().then((result) => {
            res.render('friends', {result: result})
        })

    });
}