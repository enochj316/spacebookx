const express = require('express');
const path = require('path');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

// API Routes ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
app.get("/posts", (req, res) => {
    db.Posts.findAll().then((result) => res.send(JSON.stringify(result)))
})

app.post("/posts", (req, res) => {
    db.Posts.create({
        title: req.body.title,
        body: req.body.body,
        UserId: req.body.UserId
    }).then((result) => res.json(result))
})

app.delete("/posts/:id", (req, res) => {
    db.Posts.destroy({
        where: {
            id: req.params.id,
        },
    }).then((result) => res.json(result))

})
// Friends //
//get friends of specific person
app.get("/friends", (req, res) => {
    db.Friends.findAll({
        where: {
                             
        }
    })
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// HTML Routes ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/login.html"));
});

//add {force: true} to reset table
db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});