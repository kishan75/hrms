var passport = require("passport");
var model = require("../model/index");
var bcrypt = require("bcrypt");
var joi = require("joi");
const key=require("../key.js");

var collection = {};

collection.logIn = function (req, res, next) {
    console.log(req.body);
    if(key.superAdmin.id==req.body.username && key.superAdmin.password==req.body.password){
        req.superAdmin=true;
        return res.render('dashboard',{superAdmin:true})
       }

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
            return res.status(200).send(JSON.stringify({
                path: "/",
                msg: "logged in successfully"
            }));
        });
    })(req, res, next);
};



collection.logOut = function (req, res) {
    req.logout();
    res.status(200).redirect("/");
};
collection.signUp = function (req, res, next) {
    var validation = {
        email: joi.string().email(),
        password: joi.string().min(5).required(),
        firstName:joi.string().required(),
        lastName:joi.string(),
        startDate:joi.date().required(),
        address:joi.string(),
        admin:joi.bool().required(),
        category:joi.string().required(),
        panNumber:joi.string(),
        bloodGroup:joi.string(),
        salary:joi.number().required(),
        profilePicture:joi.string(),
        status:joi.bool().required()
    };

    if (joi.validate(req.body, validation).error) {
        res.status(400).send(
            JSON.stringify({
                msg: "invalid input format"
            }));
    } else
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
                    profilePicture: '/' + req.file.path,
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    contact:req.body.contact,
                    startDate:req.body.startDate,
                    address:req.body.address,
                    isAdmin:req.body.isAdmin,
                    category:req.body.category,
                    panNumber:req.body.panNumber,
                    bloodGroup:req.body.bloodGroup,
                    salary:req.body.salary,
                    status:req.body.status
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