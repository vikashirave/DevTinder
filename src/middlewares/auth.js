const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = ('/admin', (req, res, next) => {
    const token = 'abc';
    const isAdminAuthorized = token === 'abc';
    if (!isAdminAuthorized){
        res.status(401).send('Unauthorized request');
    }
    else {
        next();
    }
})

const userAuth = ('/admin', async(req, res, next) => {
    try{
        // Read the token 
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token is not valid");
        }
        const decodedObj = await jwt.verify(token, "DEV@Tinder@790");

        const {_id} = decodedObj;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch(err){
        res.status(400).send("ERROR:", + err.message);
    }
})

module.exports = {
    adminAuth,
    userAuth
}