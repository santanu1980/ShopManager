/**
 * Created by Santanu on 12-07-2015.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('adminlogin', { title : "Administrator Login..." });
});

module.exports = router;