var express = require('express');
var router = express.Router();
var controller = require("../controller/index");

router.get('/range', function (req, res) {
    controller.attendence.rangeData(req, res);
});
router.post('/entry', function (req, res) {
    controller.attendence.entry(req, res);
});
router.post('/exit', function (req, res) {
    controller.attendence.exit(req, res);
});
module.exports = router;