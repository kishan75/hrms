var passport = require("passport");
var model = require("../model/index");
var bcrypt = require("bcrypt");
var joi = require("joi");
const key = require("../key.js");

var collection = {};

collection.logIn = function (req, res, next) {
    console.log(req.body);
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            console.log(err);
            res.status(500).send("internal server problem");
        }
        if (!user)
            return res.status(404).send(JSON.stringify({
                msg: "credentials not found"
            }));
        req.logIn(user, function (err) {
            if (err) {
                console.log(err);
                res.status(500).send("internal server problem");
            }
            return res.redirect('/');
        });
    })(req, res, next);
};



collection.logOut = function (req, res) {
    req.logout();
    res.status(200).redirect("/");
};
collection.signUp = function (req, res, next) {
    model.User.find({},function(err,result){
    
    });
    model.User.findOne({
        email: req.body.email
    }, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("internal server problem");
        } else
        if (result) {
            res.status(400).send(
                JSON.stringify({
                    path: "/",
                    msg: "email already exist"
                }));
        } else {
            var user = new model.User({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                startDate: req.body.startDate,
                profilePicture: '/' + req.file.path,
                isAdmin: req.body.isAdmin,
                category: req.body.category,
                address: req.body.address,
                contact: req.body.contact,
                panNumber: req.body.panNumber,
                bloodGroup: req.body.bloodGroup,
                salary: req.body.salary,
                status: req.body.status,
                dob: req.body.dob
            });
            console.log(req.body);
            model.User.create(user, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send("internal server problem");
                } else
                    collection.logIn(req, res, next);
            });
        }
    });

};
module.exports = collection;