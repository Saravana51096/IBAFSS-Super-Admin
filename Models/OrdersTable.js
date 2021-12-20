const mongoose = require("mongoose");
const validator = require("mongoose-validator")
const OrdersTable = new mongoose.Schema({


        OrderId:
        {
            type : String,
        },
        CustomerName  :
        {
            type : String,
        },
        PlanName:
        {
            type: String,
        },
        Price:
        {
            type: String,
        },
        Date:
        {
            type: String,
        },
        PaymentType:
        
        {
            type: String,
        },
        
        Status:
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
module.exports = mongoose.model("Orders", OrdersTable);