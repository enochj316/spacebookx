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
        name: req.body.name,
        email: req.body.email,
        phonenumber: req.body.phonenumber
    }).then((result) => res.json(result))
})

//add {force: true} to reset table
db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});