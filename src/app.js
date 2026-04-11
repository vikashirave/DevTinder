const express = require("express");

const app = express();
const {adminAuth, userAuth} = require("./middlewares/auth");

app.use('/admin', adminAuth);

app.get('/admin/getAllData', (req, res) => {
    res.send('All data send');
})
app.get('/admin/deleteUser',adminAuth,  (req, res) => {
    res.send('Deleted a user send');
})

app.get('/user',userAuth,  (req, res) => {
    res.send('Deleted a user send');
})

app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("something wend wrong");
    }
})

app.listen(3000, () => {
    console.log("server is successfully running..");
});