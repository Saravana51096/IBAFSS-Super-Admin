const mongoose = require("mongoose");
const validator = require("mongoose-validator")
const Plans = new mongoose.Schema({

    PlanName :
    {
        type : String,
    },
    Price:
    {
        type : String,
    },
    
    Duration :
    {
        type : String,
    },
    MaximumUsers:
    {
        type: String,
    },
    MaximumCustomers :
    {
        type : String,
    },
    
    MaximumVendors :
    {
        type : String,
    },
    MaximumClients:
    {
        type : String,
    },
    Documents :
    {
        type : String,
    },
    Description  :
    {
        type : String,
    },
    CRM :
    {
        type : Boolean,
    },
    Project:
    {
        type: Boolean,
    },
    HRM :
    {
        type : Boolean,
    },
    Account :
    {
        type : Boolean,
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
module.exports = mongoose.model("Plans_SuperAdmin", Plans);
