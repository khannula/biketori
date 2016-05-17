/**
 * Created by Kari on 22.3.2016.
 */
var logger = require('../routes//logger');
var fs = require('fs');
//var myJson = [];

exports.readTestJson = function( callback ) {
    fs.readFile('./models/ilmoitukset.json', "utf8", function (err, data) {
        if (err) {
            //throw err;
            logger.error('On reading ilmoitukset.json: ' + err);
            callback(err, null)
        }
        else {
            logger.info('ilmoitukset.json read OK! Data: ' + data);
            //myJson = data;
            callback(null, JSON.parse(data));

            /*for(var myKey in myJson ) {
                console.log('key:'+myKey+', value:'+myJson[myKey].id);
                console.log('key:'+myKey+', value:'+myJson[myKey].userid);
                console.log("key:"+myKey+", value:"+myJson[myKey].brand);
                console.log("key:"+myKey+", value:"+myJson[myKey].text);
            }*/
            //callback = myJson;
        }
    });
};
