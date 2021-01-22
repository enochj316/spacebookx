// Requiring necessary npm packages
const express = require("express");

const app = express();
const db = require("./models")
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('app/public'));

app.get("/", (req, res) => {
    db.Users.findAll({}).then((dbHit) => console.log(res.json(dbHit)))
})

app.post("/users", (req, res) => {
    db.Users.create({
        name: req.body.name,
        email: req.body.email,
        phonenumber: req.body.phonenumber
    }).then((dbHit) => res.json(dbHit))
})  

db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});