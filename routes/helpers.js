/**
 * Created by Kari on 22.3.2016.
 */

exports.checkTestMode = function( callback ) {
    if(process.env.NODE_ENV == 'development'){
        callback('true');
    }
    else {
        callback('false');
    }
};
