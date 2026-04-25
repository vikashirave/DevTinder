const express = require('express');
const profileRouter = express.Router();
const bcrypt = require("bcrypt");
const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData, validatePasswordEditData} = require("../utils/validation");

profileRouter.get("/profile" ,userAuth,  async(req, res) => {
    try {
        const user = req.user;

        res.send(user);
    } catch(err) {
        res.status(400).send("Something went wrong." + err);
    }
});

profileRouter.patch("/profile/edit", userAuth, async(req, res) => {
    try{
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request");
        }

        const loggedInUser = req.user;
        console.log(loggedInUser);

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();

        console.log(loggedInUser.firstName);

        res.json({message: `${loggedInUser.firstName } your profile updated successfully`, data: loggedInUser });
    } catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

profileRouter.patch("/profile/password", userAuth, async(req, res) => {
    try {
        
        if (!validatePasswordEditData(req)) {     
            throw new Error("Invalid Edit Request");
        }

        const {oldPassword, newPassword} = req.body;   
        const passwordHash = await bcrypt.hash(newPassword, 10);
        const user = req.user;

        user.password = passwordHash;
        user.save();
       
        res.json({message: `${user.firstName } your password updated successfully`});
    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = profileRouter;