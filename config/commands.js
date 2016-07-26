/**
 * Created by argho on 26.07.2016.
 */

var mongoose = require('mongoose');
var Contact  = mongoose.model('Contact');

module.exports = {
    '/offline' : {
        handler: goOffline,
        emit   : 'botStatus'
    },
    '/online'  : {
        handler: goOnline,
        emit   : 'botStatus'
    }
};

function goOffline(msg, bot, callback) {
    var self = this;
    bot.goOffline(function(err, bot) {
        if(err) {
            return next(err);
        }
        callback(msg, bot, self.emit);
    });
}

function goOnline(msg, bot, callback) {
    var self = this;
    bot.goOnline(function(err, bot) {
        if(err) {
            return next(err);
        }
        callback(msg, bot, self.emit);
    });
}