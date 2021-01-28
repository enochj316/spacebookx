const db = require("../models")
const passport = require("../config/passport.js");

module.exports = (app) => {
    // USERS //
    app.get("/users", (req, res) => {
        db.Users.findAll({
            include: [db.Posts, db.Friends]
        }).then((result) => res.send(JSON.stringify(result)))
    })

    app.post("/users", (req, res) => {
        db.Users.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            imageurl: req.body.imageurl,
            password: req.body.password
        }).then((result) => res.json(result))
    })

    app.delete("/users/:id", (req, res) => {
        db.Users.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => res.json(result))
    })

    // POSTS //
    //find all posts based on userid
    app.get("/posts_user", (req, res) => {
        db.Posts.findAll(
            { where: {
                UserId : req.user.id
            }}
        ).then((result) => res.json(result))
    })
    //find all posts for home page
    app.get("/posts", (req, res) => {
        db.Posts.findAll().then((result) => res.json(result))
    })

    app.post("/posts", (req, res) => {
        db.Posts.create({
            title: req.body.title,
            body: req.body.body,
            UserId: req.user.id
            //req.user.id is a global value based on passport
        }).then((result) => res.json(result))
    })

    app.delete("/posts/:id", (req, res) => {
        db.Posts.destroy({
            where: {
                id: req.params.id,
            },
        }).then((result) => res.json(result))

    })

    // Login with passport//
    app.post("/api/login", passport.authenticate("local", {
        successRedirect: "/home_id",
        failureRedirect: "/",
        failureFlash: true
    }), (req, res) => {
        if (error) {
            console.log("login failed")
        } else {
            console.log("login successful")
            res.json({
            email: req.user.email,
            id: req.user.id
        });
        }
        
    });

    app.get("/api/user_data", (req, res) => {
        if (!req.user) {
          // The user is not logged in, send back an empty object
          res.json({});
        } else {
          // Otherwise send back the user's email and id
          // Sending back a password, even a hashed password, isn't a good idea
          res.json({
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            phonenumber: req.user.phonenumber,
            imageurl: req.user.imageurl,
            id: req.user.id
          });
        }
      });

      //adding friends route
      app.post("/friends", (req, res) => {
        db.Friends.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            UserId: req.user.id
            //req.user.id is a global value based on passport
        }).then((result) => res.json(result))
      })

      app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
      });
};


