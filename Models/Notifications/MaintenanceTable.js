const mongoose = require("mongoose");
const Maintenance = new mongoose.Schema({


        MaintananceName:
        {
            type : String,
        },
        Description :
        {
            type : String,
        },
        Comment:
        {
            type: String,
        },
        FromDate:
        {
            type: String,
        },
        ToDate:
        {
            type: String
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
module.exports = mongoose.model("Maintenance", Maintenance);