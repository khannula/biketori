/**
 * Created by Kari on 18.3.2016.
 */

var express = require('express');
var router;
router = express.Router();
//var path = require('path'); // ???
var fs = require('fs'); // for json file in TEST_MODE
var logger = require('./logger');
var helper = require('./helpers');
var jsonreader = require('../models/jsonhandler');
var test;
var myJson = [];

logger.info('Enter ilmoitukset.js');

// set test mode on if needed
helper.checkTestMode(function (mode) {
    test = mode;
});

if(test == 'true') {logger.info('Test mode on!')};

// Log request
router.use( function (req, res, next ) {
    logger.info('Request URL: ' + req.originalUrl);
    logger.info('Request Type: ' + req.method);
    next(); // Must be or request get jammed
});

if( test == 'true') {
    jsonreader.readTestJson(function(err, tempjson) {
        if(err) {
            logger.error('JSON file not read.' +err);
        }
        else {
            myJson = tempjson;

            for (var myKey in myJson) {
                console.log('enter for');
                console.log('key:' + myKey + ', value:' + myJson[myKey].id);
                console.log('key:' + myKey + ', value:' + myJson[myKey].userid);
                console.log("key:" + myKey + ", value:" + myJson[myKey].brand);
                console.log("key:" + myKey + ", value:" + myJson[myKey].text);
            }
        }
    });
}

// Routes for /ilmoitukset page

// GET all in path /ilmoitukset
router.get('/ilmoitukset', function(req, res) {
    logger.info('GET all');
    if( test == 'true') {
        logger.info('GET json length:' +myJson.length);
        res.send(JSON.stringify(myJson));
    }
    else {
        // Read from db ...
        res.statusCode = 404;
        res.statusText = 'Not Found';
        res.send();
    }

});

// GET path /ilmoitukset/:id
router.get('/ilmoitukset/:ad_id', function (req, res, next) {
    logger.info('GET ad_id:' +req.params.ad_id);

    var tempAd;
    for(var myKey in myJson ) {
        if(myJson[myKey].id == req.params.ad_id) {
            console.log("Get this:");
            console.log('key:' + myKey + ', value:' + myJson[myKey].id);
            console.log('key:' + myKey + ', value:' + myJson[myKey].userid);
            console.log("key:" + myKey + ", value:" + myJson[myKey].brand);
            console.log("key:" + myKey + ", value:" + myJson[myKey].text);
            tempAd = myJson[myKey]
            break;
        }
    }
    res.send(JSON.stringify(tempAd));
});

 // POST path /ilmoitukset/ad
router.post('/ilmoitukset/ad', function(req, res) {

    logger.info('post() NEW ');

    console.log('id : '+ req.body.id);
    console.log('userid : ' + req.body.userid);
    console.log('brand : ' + req.body.brand);
    console.log('text : ' + req.body.text);

    console.log('myJson length: ' + myJson.length);

    myJson.push( {
            "id" : req.body.id,
            "userid" : req.body.userid,
            "brand" : req.body.brand,
            "text" : req.body.text
        }
    );

    //fs.writeFileSync('./models/ilmoitukset.json', JSON.stringify(myJson.join(',')) , 'utf-8');
    fs.writeFileSync('./models/ilmoitukset.json', JSON.stringify(myJson), 'utf-8');

    res.statusCode = 200;
    res.statusText = 'OK';
    res.send();
});

// POST/MODIFY path /ilmoitukset/ad/:id
router.post('/ilmoitukset/ad/:ad_id', function(req, res) {

    logger.info('post() MODIFY ad_id:' +req.params.ad_id);

    // person on taulukon indeksi
    // item on parametri id, userid, brand, text
    // value on parametrin arvo esim. brand: Honda
    // HUOM! Tämäkin periaattees toimii, mutta foreach ei pääse break ulos.
    /*var people = Object.keys(myJson);
    people.forEach(function(person) {
        var items = Object.keys(myJson[person]);
        items.forEach(function(item) {
            var value = myJson[person][item];
            console.log(person+': '+item+' = '+value);
            // Find right ad using id (ad_id)
            if(value == req.params.ad_id) {
                console.log("Found ad: " +value +" in item: " +item +" indeksissa: " +person);

            }
        });
    });*/

    var found = 'false';
    for(var myKey in myJson ) {
        if(myJson[myKey].id == req.params.ad_id) {
            console.log("Modify this:");
            found = 'true';
            console.log('key:' + myKey + ', value:' + myJson[myKey].id);
            console.log('key:' + myKey + ', value:' + myJson[myKey].userid);
            console.log("key:" + myKey + ", value:" + myJson[myKey].brand);
            myJson[myKey].brand = req.body.brand;
            console.log("key:" + myKey + ", value:" + myJson[myKey].text);
            myJson[myKey].text = req.body.text;
            break;
        }
    }
    if(found == 'true') {
        fs.writeFileSync('./models/ilmoitukset.json', JSON.stringify(myJson), 'utf-8');
        res.statusCode = 200;
        res.statusText = 'OK';
        //res.send('modified... ad_id:' + req.params.ad_id);
    }
    else {
        res.statusCode = 404;
        res.statusText = 'Not Found';
        //res.send('Not Found... ad_id:' + req.params.ad_id);
    }
    res.send(req.params.ad_id);
});

 // DELETE advertisement
router.delete('/ilmoitukset/ad/:ad_id', function(req, res) {

    logger.info('DELETE ad_id: ' +req.params.ad_id)
    //console.log(JSON.stringify(req.body));

    res.statusCode = 200;
    res.statusText = 'OK';
    res.send('deleted... ad_id:' +req.params.ad_id);

});

// mount the router on the app
module.exports = router;
