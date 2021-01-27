const db = require("../models")
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");

// HTML Routes ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = (app) => {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

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

        //do a findAll posts, then pass result as object into render
        db.Posts.findAll().then((result) => {
            res.render('home', {result: result})
            //     title: result[0].dataValues.title,
            //     body: result[0].dataValues.body,
            //     createdAt: result[0].dataValues.createdAt
            // }) 
            console.log({
                title: result[0].dataValues.title,
                body: result[0].dataValues.body,
                createdAt: result[0].dataValues.createdAt
            })
        })

    });
}