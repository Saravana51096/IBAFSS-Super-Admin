const mongoose = require("mongoose");
const validator = require("mongoose-validator")
const PlanUpgrade = new mongoose.Schema({


        PlanName:
        {
            type : String,
        },
        Price :
        {
            type : String,
        },
        Validity:
        {
            type: String,
        },
        Amount:
        {
            type: String,
        },
        Status:
        {
            type: String
        },
        Duration:
        {
            type: String
        },
        MaximumUsers:
        {
            type: String
        },
        MaximumCustomers:
        {
            type: String
        },
        MaximumVendors:
        {
            type: String
        },
        MaximumClients:
        {
            type: String
        },
        Description:
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
module.exports = mongoose.model("Plan_Upgrade", PlanUpgrade);