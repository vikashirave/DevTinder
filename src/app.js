const express = require("express");

const app = express();

app.use("/test/vikas", (req, res) => {
    res.send("hello from server.");
});

app.use("/test/vikas", (req, res) => {
    res.send("hello from server.");
});

app.use("/", (req, res) => {
    res.send("hello from vikas.");
});

app.listen(3000, () => {
    console.log("serve is successfully running..");
});