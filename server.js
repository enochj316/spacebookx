const express = require('express');

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

// Routes
app.get("/users", (req, res) => {
    db.Users.findAll().then((result) => res.send(JSON.stringify(result)))
})

app.post("/users", (req, res) => {
    db.Users.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phonenumber: req.body.phonenumber
    }).then((result) => res.json(result))
})

app.get("/posts", (req, res) => {
    db.Posts.findAll().then((result) => res.send(JSON.stringify(result)))
})

app.post("/posts", (req, res) => {
    db.Posts.create({
        title: req.body.title,
        body: req.body.body
    }).then((result) => res.json(result))
})

//add {force: true} to reset table
db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});