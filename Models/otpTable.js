const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpschema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    otpgenerate: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

module.exports = mongoose.model("otp_SuperAdmin", otpschema);