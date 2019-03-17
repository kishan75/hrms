var collection = {};
var model = require("../model/index");
var mongoose = require("mongoose");

collection.generatePayroll = function (req, res) {
    model.User.findById(req.body._id).populate('payroll').populate('attendence').exec(function (err, result) {
        if (result.payroll.length) {
            model.Attendence.find({
                user: req.body._id,
                entry: {
                    $gte: result.payroll[result.payroll.length - 1].date
                }
            }, function (err, response) {
                if (err) {
                    console.log(err);
                    res.status(500).send("internal server problem");
                } else
                    res.status(200).send(JSON.stringify({
                        msg: "success",
                        data: {
                            totalDay: response.length,
                            totalAmount: (result.salary / 30) * response.length
                        }
                    }));
            });
        } else {
            model.Attendence.find({
                user: req.body._id
            }, function (err, response) {
                if (err) {
                    console.log(err);
                    res.status(500).send("internal server problem");
                } else
                    res.status(200).send(JSON.stringify({
                        msg: "success",
                        data: {
                            totalDay: response.length,
                            totalAmount: (result.salary / 30) * response.length
                        }
                    }));
            });
        }
    });
};

collection.generatePayment = function (req, res) {
    var payroll = new model.Payroll({
        user: req.body._id,
        totalDays: req.body.totalDays,
        totalMoney: req.body.totalMoney,
        method: req.body.method,
        issuedBy: req.user._id,
        transactionNumber: req.body.transactionNumber
    });
    model.Payroll.create(payroll, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("internal server problem");
        } else {
            model.User.findByIdAndUpdate(req.body._id, {
                $push: {
                    payroll: result._id
                }
            }, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send("internal server problem");
                } else {
                    res.status(200).send(JSON.stringify({
                        msg: "success",
                    }));
                }
            });
        }
    });
};
module.exports = collection;