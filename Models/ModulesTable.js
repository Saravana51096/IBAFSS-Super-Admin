const mongoose = require("mongoose");
const validator = require("mongoose-validator")
const ModulesTable = new mongoose.Schema({


        ModuleName:
        {
            type : String,
        },
        Price  :
        {
            type : String,
        },
        Description:
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
module.exports = mongoose.model("Modules_SuperAdmin", ModulesTable);