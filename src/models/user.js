const mongoose = require('mongoose');

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
                trim: true
            },
            password:{
                type:String,
                required: true
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
                default: "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
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

const User = mongoose.model("User", userSchema);

module.exports = User;