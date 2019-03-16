var collection = {};
var model = require("../model/index");
var mongoose = require("mongoose");

collection.entry = function (req, res) {
    var attendence = new model.Attendence({
        user: req.user._id,
        teamLead: req.user.teamLead,
        purpose: req.body.purpose
    });
    model.Attendence.create(attendence, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("internal server problem");
        } else {
            model.User.findOneAndUpdate({
                $push: {
                    attendence: result._id
                }
            }, {
                'new': true
            }, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send("internal server problem");
                } else
                    res.status(200).send(JSON.stringify({
                        msg: "success",
                        data: result
                    }));
            });
        }
    });
};

collection.exit = function (req, res) {
    model.Attendence.findByIdAndUpdate(req.user.attendence[req.user.attendence.length - 1], {
        exit: Date.now()
    }, {
        'new': true
    }, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("internal server problem");
        } else
            res.status(200).send(JSON.stringify({
                msg: "success",
                data: result
            }));
    });
};

collection.rangeData = function (req, res) {
    model.Attendence.find({
        user: req.body._id,
        entry: {
            $gte: req.body.startDate,
            $let: req.body.lastDate
        }
    }, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("internal server problem");
        } else
            res.status(200).send(JSON.stringify({
                msg: "success",
                data: result
            }));
    });
};

module.exports = collection;