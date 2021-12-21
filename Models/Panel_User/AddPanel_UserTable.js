const mongoose = require("mongoose");
const validator = require("mongoose-validator")
const PanelUser = new mongoose.Schema({


        Name:
        {
            type : String,
        },
        Email  :
        {
            type : String,
        },
        MobileNumber:
        {
            type: String,
        },
        Address:
        {
            type: String,
        },
        Country:
        {
            type: String,
        },
        State:
        {
            type: String,
        },
        City:
        {
            type: String,
        },
        Pincode:
        {
            type: String,
        },
        Password:
        {
            type: String,
        },
        Roles:
        {
            type: String,
        },
        Permissions:
        {
            type: String,
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
})
module.exports = mongoose.model("PanelUser_SuperAdmin", PanelUser);