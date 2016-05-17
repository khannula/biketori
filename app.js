/**
 * Created by Kari on 18.3.2016.
 */

var express = require('express');
var path = require('path');
// Handles post requests
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());

//app.use(express.static(__dirname + '/public'));
//app.use(require('./public/js'));
app.use(require('./routes/index'));
app.use(require('./routes/ilmoitukset'));
//app.use(require('./routes/users'));

//app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '/public/'));
app.use('/templates', express.static(__dirname + '/views/templates/'));
app.use('/scripts', express.static(__dirname + '/node_modules/'));


// print process.argv and check if test=1
/*var test = 0;
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
    if(val === 'test'){
        test = 1;
        console.log('TEST MODE ON');
    }
});
*/

/***
    Set test env if needed:

    set NODE_ENV=development
    echo %NODE_ENV%
    nodemon app.js

 ***/

app.listen(port, function () {
    console.log('App server listening on port ' + port);
});
