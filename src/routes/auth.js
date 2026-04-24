const express = require('express');
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {userAuth} = require("../middlewares/auth");
const {validateSignUpData} = require("../utils/validation");


authRouter.post("/signup", async(req, res)=>{
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

authRouter.post("/login", async(req, res) => {
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

module.exports = authRouter;