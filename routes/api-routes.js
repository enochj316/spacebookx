const db = require("../models")
const passport = require("../config/passport.js");
const axios = require("axios");

module.exports = (app) => {
    // USERS //
    app.get("/users", (req, res) => {
        db.Users.findAll({
            include: [db.Posts, db.Friends]
        }).then((result) => res.send(JSON.stringify(result)))
        .catch(err => console.error(err));
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
        .catch(err => console.error(err));
    })

    app.delete("/users/:id", (req, res) => {
        db.Users.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => res.json(result))
        .catch(err => console.error(err));
    })

    // app.get("/friends", (req, res) => {
    //     db.Friends.findAll().then((result) => {
    //         res.json(result)
    //     })
    // })

    app.delete("/friends/:id", (req, res) => {
        db.Friends.destroy({
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

    app.delete("/delete_post/:id", (req, res) => {
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
            img_url: req.body.image_url,
            UserId: req.user.id
            //req.user.id is a global value based on passport
        }).then((result) => res.json(result))
        .catch(err => console.error(err));
      })
    
    app.get("/weather/:city", (req, res) => {
        let city = req.params.city;
        console.log(city)
        axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + process.env.WEATHER_KEY)
            .then((result) => {
                console.log(result)
                let city = result.data.name;
                let humidity = result.data.main.humidity;
                let temperature = result.data.main.temp - 273.15;
                let windspeed = result.data.wind.speed;

                res.json({name: city,
                            temperature: temperature,
                        humidity: humidity,
                    windspeed: windspeed})
            })
            .catch(err => console.error(err));
        })  
    app.get("/news", (req, res) => {
        axios({
                method: 'get',
                url: 'https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=' + process.env.NYTIMES_KEY
                
            })
            .then(result => res.send(result))
            .catch(err => console.error(err));

    })

    app.get("/giphy", (req, res) => {
        axios({
                method: 'get',
                url: 'https://api.giphy.com/v1/gifs/search?q=funny&api_key=' + process.env.GIPHY_KEY
            })
            .then(result => res.send(result.data))
            .catch(err => console.error(err));

    })

      app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
      });
};