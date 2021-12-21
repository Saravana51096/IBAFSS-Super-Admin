const mongoose = require("mongoose");
const validator = require("mongoose-validator")
const General_Settings = new mongoose.Schema({

    CompanyLogo :
    {
        type : String,
    },
    CompanyName:
    {
        type : String,
    },
    
    CompanyAddress :
    {
        type : String,
    },
    PhoneNumber:
    {
        type: String,
    },
    TitleText :
    {
        type : String,
    },
    
    FooterText :
    {
        type : String,
    },
    DefaultLanguage:
    {
        type : String,
    },
    LandingPageDisplay :
    {
        type : String,
    },
    FooterLinkTitle1  :
    {
        type : String,
    },
    FooterLinkhref1 :
    {
        type : String,
    },
    FooterLinkTitle2:
    {
        type: String,
    },
    FooterLinkhref2 :
    {
        type : String,
    },
    
    FooterLinkTitle3 :
    {
        type : String,
    },
    FooterLinkhref3:
    {
        type : String,
    },
    PusherAppId :
    {
        type : String,
    },
    PusherAppKey  :
    {
        type : String,
    },
    PusherAppSecret  :
    {
        type : String,
    },
    PusherAppCluster  :
    {
        type : String,
    },
    CurrencySymbol  :
    {
        type : String,
    },
    Currency  :
    {
        type : String,
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
module.exports = mongoose.model("General_Settings_SuperAdmin", General_Settings);
