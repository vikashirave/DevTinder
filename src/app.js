const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const mongoose = require("mongoose");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async(req, res)=>{
    try {
        //validate data.
        validateSignUpData(req);

        // encrypt the password
        const {firstName, lastName, emailId, password} = req.body;
        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({firstName, lastName, emailId, password: passwordHash});

        await user.save();
        res.send("User Added successfully");
    } catch (err){
        res.status(500).send("Error saving the user: " + err)
    }
});

app.post("/login", async(req, res) => {
    try {
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId: emailId});
        if (!user) {
            throw new Error("User details not valid.");
        }

        console.log(password);

        const isPasswordValid = await user.validatePassword(password);
        
        if (isPasswordValid) {

            //create a jwt token

            const token = await user.getJWT();

            res.cookie('token', token)
            res.status(200).send("Login successfull.");
        }
        else {
            throw new Error("User details is not valid");
        }
    } catch(err) {
        res.status(400).send("ERROR" + err);
    }
});

app.get("/profile",userAuth , async(req, res) => {
    try {
        const user = req.user;

        res.send(user);
    } catch(err) {
        res.status(400).send("Something went wrong." + err);
    }
})

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

app.get('/getuser/:userId', async(req, res) =>{
    try {
        const userId = req.params.userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send("Invalid user ID");
        }

        const user = await User.findById(userId);
        console.log(user);

        if (user == null) {
            res.status(404).send("user not found");
        }
        
        res.status(200).send(user);
    } catch(err) {
        res.status(400).send("something wend wrong"+ err);
    }
});

app.delete('/user/:userId', async(req, res) =>{
    try {
        const userId = req.params.userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send("Invalid user ID");
        }

        const user = await User.findOneAndDelete(userId);
        console.log(user);

        if (user == null) {
            res.status(404).send("user not found");
        }

        console.log(user);

        if (user == null) {
            res.status(404).send("user not found");
        }
        
        res.status(200).send("user deleted successfully.");
    } catch(err) {
        res.status(400).send("something wend wrong"+ err);
    }
});

app.patch("/user/:userId", async(req, res) =>{
    try{
        const userId = req.params.userId;
        const data = req.body;

        const ALLOWED_UPDATES = [
            "userId",
            "photoUrl",
            "about",
            "gender",
            "age",
            "skills"
        ];

        const isUpdatedAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));
        if (!isUpdatedAllowed) {
            throw new Error("Update not allowed.");
        }

        if (data?.skills.length > 1) {
            throw new Error("Skills cannot be more than 10.")
        }

        const user = await User.findByIdAndUpdate({_id: userId}, data, {returnDocument: "after", runValidators: true});

        console.log(user);
        if (user == null) {
            res.status(404).send("user not found");
        }

        //console.log(user);

        if (user == null) {
            res.status(404).send("user not found");
        }
        
        res.status(200).send("user updated successfully.");
        
    } catch(err){
        res.status(400).send("Something went wrong. " + err);
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

