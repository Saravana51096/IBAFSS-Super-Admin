const mongoose = require("mongoose");
const validator = require("mongoose-validator")
const CompaniesTable = new mongoose.Schema({

    CompanyName :
    {
        type : String,
    },
    CompanyEmail:
    {
        type : String,
    },
    
    CompanyPhone :
    {
        type : String,
    },
    Mobile:
    {
        type: String,
    },
    CompanyWebsite :
    {
        type : String,
    },
    
    CompanyGST :
    {
        type : String,
    },
    CompanyPan:
    {
        type : String,
    },
    CompanyType :
    {
        type : String,
    },
    Date  :
    {
        type : String,
    },
    Username :
    {
        type : String,
    },
    Password:
    {
        type: String,
    },
    Package :
    {
        type : String,
    },
    
    DepositType :
    {
        type : String,
    },
    Address1:
    {
        type : String,
    },
    Address2 :
    {
        type : String,
    },
    Country  :
    {
        type : String,
    },
    State  :
    {
        type : String,
    },
    City  :
    {
        type : String,
    },
    Pincode  :
    {
        type : String,
    },
    CompanyLogo  :
    {
        type : String,
    },
    Documents  :
    {
        type : String,
    },
    LabelName:
    {
        type: [String],
    },
    Value:
    {
      type: [String],
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
module.exports = mongoose.model("Companies_SuperAdmin", CompaniesTable);
