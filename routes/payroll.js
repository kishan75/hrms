var express = require('express');
var router = express.Router();
var controller = require("../controller/index");

router.post('/range', function (req, res) {
    controller.attendence.rangeData(req, res);
});
router.post('/entry', function (req, res) {
    controller.attendence.entry(req, res);
});
module.exports = router;