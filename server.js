// Requiring necessary npm packages
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('app/public'));

app.get("/", (req, res) => {
    res.send("MAIN page")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})