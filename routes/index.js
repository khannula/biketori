/**
 * Created by Kari on 18.3.2016.
 */

var express = require('express');
var router = express.Router();
var path = require('path');

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
    console.log('Request URL:', req.originalUrl);
    console.log('Request Type:', req.method);
    next();
});

// define the home page route
router.get('/', function(req, res) {
    //res.send('Home page');
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

// mount the router on the app
module.exports = router;
