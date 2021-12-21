const mongoose = require("mongoose");
const validator = require("mongoose-validator")
const Offer_Notifications = new mongoose.Schema({


    OfferName:
        {
            type : String,
        },
        Offer :
        {
            type : String,
        },
        CompanyName:
        {
            type: String,
        },
        PromoCode:
        {
            type: String,
        },
        Validity:
        {
            type: String
        },
        Subject:
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
module.exports = mongoose.model("Offer_Notifications_SuperAdmin", Offer_Notifications);