/**
 * Created by Kari on 18.3.2016.
 */

var express = require('express');
var router = express.Router();

// Log request
/*router.use(function (req, res, next) {
    console.log('Request URL:', req.originalUrl);
    console.log('Request Type:', req.method);
    next();
});

// Routes for /users page

// GET all in path /users
router.get('/users', function(req, res) {
    res.send('Users sivu!');
});

// GET path /users/:id
router.get('/users/:id', function (req, res, next) {
    console.log(req.params.id);
    res.send('Users sivu! id:' +req.params.id);
});
*/
// mount the router on the app
module.exports = router;
