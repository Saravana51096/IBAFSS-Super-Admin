const mongoose = require("mongoose");
const Promotional = new mongoose.Schema({


        PromotionalName:
        {
            type : String,
        },
        Duration:
        {
            type : String,
        },
        Description:
        {
            type: String,
        },
        Message:
        {
            type: String,
        },
        CompanyName:
        {
            type: String
        },
        Subject:
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
module.exports = mongoose.model("Promotional_SuperAdmin", Promotional);