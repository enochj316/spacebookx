const db = require("../models")
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");

// HTML Routes ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = (app) => {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    // app.get("/home", isAuthenticated, (req, res) => {
    //     res.sendFile(path.join(__dirname, "../public/home.html"));
    // })

    app.get("/user_id", (req, res) => {
        const exphbs = require('express-handlebars');

        app.engine('handlebars', exphbs({
            defaultLayout: '_user'
        }));
        app.set('view engine', 'handlebars');

        res.render('user');

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

        //do a api call, to create an object and pass into res.render to generate handlebar
        //currently getting a promise.....
        //alternatively generate dynamic elements in home.js instead
        const hbsObject = db.Posts.findAll().then((result) => response.json(result))
        console.log(hbsObject)

        res.render('home');

        /*  // Import routes and give the server access to them.
        const routes = require('../controllers/user_controller');

        app.use(routes); */ 
    });
}