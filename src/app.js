const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

app.post("/signup", async(req, res)=>{
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User Added successfully");
    } catch (err){
        res.status(500).send("Error saving the user: " + err.messsage)
    }
});

app.get("/user", async(req, res)=>{
    try {
        const userData = await User.find({emailId: req.body.emailId});
        if(userData.length === 0){
            res.status(404).send("User not found.");
        } else {
            res.send(userData);
        } 
    } catch (err){
        res.status(400).send("Something went wrong.");
    }
});

// feed api - get all the users from db

app.get("/feed", async(req, res)=>{
    try {
        const userData = await User.find({});
        if(userData.length === 0){
            res.status(404).send("User not found.");
        } else {
            res.send(userData);
        } 
    } catch (err){
        res.status(400).send("Something went wrong.");
    }
});

connectDB()
    .then(()=>{
        console.log("Database connection established...");
        app.listen(3000, () => {
            console.log("server is successfully running..");
        });
    })
    .catch(()=>{
        console.log("Database cannot be conected!!!");
    })

