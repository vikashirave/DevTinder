const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
        {
            firstName:{
                type:String,
                required: true,
                minLength: 4,
                maxLength: 50
            },
            lastName:{
                type:String
            },
            emailId:{
                type:String,
                required: true,
                unique:true,
                lowercase: true,
                trim: true,
                validate(value) {
                    if(!validator.isEmail(value)){
                        throw new Error("Invalide email address.");
                    }
                }
            },
            password:{
                type:String,
                required: true,
                validate(value) {
                    if(!validator.isStrongPassword(value)){
                        throw new Error("Please Enter a strong password.");
                    }
                }
            },
            age:{
                type:Number,
                min: 18
            },
            gender:{
                type: String,
                validate(value) {
                    if(!["male", "female", "others"].includes(value)){
                        throw new Error("Gender data is not valid");
                    }
                }
            },
            photoUrl:{
                type: String,
                default: "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
                validate(value) {
                    if(!validator.isURL(value)){
                        throw new Error("Invalid Url.");
                    }
                }
            },
            about:{
                type: String,
                default: "this is a default of about"
            },
            skills:{
                type: [String]
            }
        },
        {
            timestamps: true
        }
    );

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id:user._id}, "DEV@Tinder@790", {expiresIn: "7d"});
    return token;
}

//userSchema.index({firstName:1, lastName:1});

userSchema.methods.validatePassword = async function (password) {
    const user = this;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
}
const User = mongoose.model("User", userSchema);

module.exports = User;