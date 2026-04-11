const express = require("express");

const app = express();


app.get("/user", (req, res) => {
    res.send({firstName: 'Vikas', lastName:'Hirave'});
});
app.post("/user", (req, res) => {
    res.send("Data successfully stored to db");
});

app.delete("/user", (req, res) => {
    res.send("Deleted successfully");
});

app.listen(3000, () => {
    console.log("serve is successfully running..");
});