const db = require("../models")
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const { response } = require("express");
const flash = require("express-flash");
const axios = require("axios")

// HTML Routes ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = (app) => {
    app.get("/", (req, res) => {
        req.user = "";
        const errors = req.flash().error || [];
        //render handlebar with errors passed in... from flash once handlebar is created
        res.sendFile(path.join(__dirname, "../public/login.html"))
        // res.render("login.", {message: flash("message")});
    });

    app.get("/user_id", isAuthenticated, (req, res) => {
        const exphbs = require('express-handlebars');

        app.engine('handlebars', exphbs({
            defaultLayout: '_user'
        }));
        app.set('view engine', 'handlebars');

        //change friends to find all where id = req.user.id (friends of person who is logged in)
        db.Posts.findAll({where: {UserId: req.user.id}}).then((posts) => {
            db.Friends.findAll({where : {UserId: req.user.id}}).then((friends) => {
                res.render('user', {
                    posts: posts,
                    friends: friends
                })
            })
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
            res.render('home', { result: result })
        })
    });

    app.get("/getcity/:name", isAuthenticated, (req, res) => {
        const exphbs = require('express-handlebars');

        app.engine('handlebars', exphbs({
            defaultLayout: '_home'
        }));
        app.set('view engine', 'handlebars');
        let city = req.params.name;
        axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + process.env.WEATHER_KEY).then((Weather) => {
            res.render("home", {weather: Weather})
            console.log(Weather)
        })
    })

    app.get("/news", isAuthenticated, (req, res) => {
        //news axios call 
        //weather axios call
        //posts db call
    })

    app.get("/friends", isAuthenticated, (req, res) => {
        console.log("friends page hit!")
        const exphbs = require('express-handlebars');

        app.engine('handlebars', exphbs({
            defaultLayout: '_friends'
        }));
        app.set('view engine', 'handlebars');

        //change to db.Friends.findAll
        db.Users.findAll().then((result) => {
            db.Friends.findAll({where: {UserId: req.user.id}}).then((friends) => {
                res.render('friends', { result: result,
                                        friends: friends})
            })
        })
    });

    app.get("/user/:id", isAuthenticated, (req, res) => {
        const exphbs = require('express-handlebars');

        app.engine('handlebars', exphbs({
            defaultLayout: '_user'
        }));
        app.set('view engine', 'handlebars');


        var id = req.params.id;
        db.Users.findOne({ where: { id: id } }).then((User) => {
            db.Posts.findAll({ where: { UserId: id } }).then((Posts) => {
                db.Friends.findAll({ where: { UserId: id } }).then((Friends) => {
                    res.render("user", {
                        user: User,
                        posts: Posts,
                        friends: Friends
                    })
                    console.log({
                        user: User,
                        posts: Posts,
                        friends: Friends
                    })
                })
            })


        })
    })
}