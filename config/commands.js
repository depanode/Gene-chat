/**
 * Created by argho on 26.07.2016.
 */

var mongoose = require('mongoose');
var Contact  = mongoose.model('Contact');

module.exports = {
    '/offline' : {
        handler: goOffline,
        action : 'broadcast',
        event  : 'botStatus'
    },
    '/online'  : {
        handler: goOnline,
        action : 'broadcast',
        event  : 'botStatus'
    }
};

function goOffline(msg, bot, socket, callback) {
    var self = this;
    bot.goOffline(function(err, bot) {
        if(err) return next(err);
        if(socket.timerId) {
            clearTimeout(socket.timerId);
        }
        callback(msg, bot, self.action, self.event);
    });
}

function goOnline(msg, bot, socket, callback) {
    var self = this;
    bot.goOnline(function(err, bot) {
        if(err) return next(err);
        if(socket.timerId) {
            clearTimeout(socket.timerId);
        }
        callback(msg, bot, self.action, self.event);
    });
}