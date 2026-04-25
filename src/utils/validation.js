const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    } else if(!validator.isEmail(emailId)){
        throw new Error("Email Id is not valid");
    } else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong.");
    }
}

const validateEditProfileData = (req) => {
    if (!req.body) return false;

    const allowedEditFields = [
        "firstName",
        "lastName",
        "gender",
        "photoUrl",
        "about",
        "skills",
        "age"
    ];

    const keys = Object.keys(req.body);

    if (keys.length === 0) return false;

    return keys.every(field => allowedEditFields.includes(field));
};

async function validatePasswordEditData(req) {
    if(!req.body || !req.body.oldPassword || !req.body.newPassword) return false;

    const {oldPassword, newPassword} = req.body;

    const user = req.user;
    const isPasswordValid = await user.validatePassword(oldPassword);

    if (!isPasswordValid) {
        throw new Error("Current password is invalid.");
    } else if(!validator.isStrongPassword(newPassword)){
        throw new Error("Password is not strong.");
    }

    return isPasswordValid;
};

module.exports = {validateSignUpData, validateEditProfileData, validatePasswordEditData};