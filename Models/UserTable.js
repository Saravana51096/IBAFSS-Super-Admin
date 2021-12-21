const mongoose = require("mongoose");
const validator = require("mongoose-validator")

const User = new mongoose.Schema({
    Name:
    {
        type: String,
    },
    Email:
    {
        type: String,
    },
    
    Password:
    {
        type: String,
    },
    PhoneNumber:
    {
        type: String,
         
    },
    CompanyName:
    {
        type: String,
         
    },
    CompanyWebsite:
    {
        type: String,
    },
    isVerified:
    {
        type: Boolean,
        default: false
    },
    
    isActive:
    {
        type: Boolean,
        default: true
    },
    created:
    {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("User_SuperAdmin", User);

