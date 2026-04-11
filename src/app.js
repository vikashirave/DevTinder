const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");


const app = express();

app.post("/signup", async(req, res)=>{
    const user = new User({
        firstName: "Virat",
        lastName: "Kohli",
        emailId: "virat@gmail.com",
        password: "virat@123"
    });
    try {
        await user.save();
        res.send("User Added successfully");
    } catch (err){
        res.status(500).send("Error saving the user: " + err.messsage)
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

