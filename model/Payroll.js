const mongoose = require("mongoose");
const schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    totalDays: {
        type: Number,
        required: true
    },
    totalMoney: {
        type: Number,
        required: true
    },
    date: {
        type: Date.now
    },
    method: {
        type: String
    },
    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    transactionNumber: {
        type: String
    }
});
module.exports = mongoose.model("Payroll", schema);