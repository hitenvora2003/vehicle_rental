var express = require('express');
var router = express.Router();
const mw = require('../middelware/auth')
const mc = require('../controller/meincontroller')
router.get('/',mw.authCheck, mc.getalldata);


module.exports = router;