var express = require('express');
var router = express.Router();


var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        cb(null, new Date() + file.originalname);
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/'))
            cb(null, true);
        else
            cb(null, false);
    }
});

var controller = require("../controller/index");


router.post('/login', function (req, res, next) {
   console.log("here");
    controller.user.logIn(req, res, next);

});





router.get('/logout', function (req, res) {
    controller.user.logOut(req, res);
});
router.post('/signUp', upload.single("image"), function (req, res, next) {
    controller.user.signUp(req, res, next);
});
module.exports = router;