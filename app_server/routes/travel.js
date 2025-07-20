var express = require('express');
var router = express.Router();

var travelController = require('../controllers/travel');

/* GET travel page. */
router.get('/', travelController.travel);

module.exports = router;
