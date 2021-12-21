const mongoose = require("mongoose");
const validator = require("mongoose-validator")
const Coupons = new mongoose.Schema({


        CouponName:
        {
            type : String,
        },
        Discount  :
        {
            type : String,
        },
        CouponCode:
        {
            type: String,
        },
        DiscountLimitation:
        {
            type: String,
        },
        CouponDurationFrom:
        {
            type: String
        },
        CouponDurationTo:
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
module.exports = mongoose.model("Coupons_SuperAdmin", Coupons);