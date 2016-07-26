/**
 * Created by argho on 24.07.2016.
 */
var mongoose = require('mongoose');
var Message  = mongoose.model('Message');

var handlers = {

    echo: function (message, callback) {
        callback(null, message);
    },

    reverse: function (message, callback) {
        var msg = message.text.split('').reverse().join('');
        message.text = msg;
        callback(null, message);
    },

    spam: function (message, callback) {
        var delay = Math.floor(10 + Math.random() * (120 + 1 - 10));
        setTimeout(function() {
            Message.random(callback);
        }, delay * 1000);
    },

    ignore: function (message, callback) {
        callback(null, null);
    }

};

module.exports = handleMessage;

function handleMessage(me, bot, message, callback) {

    var handler = handlers[bot.messageHandler];

    setTimeout(saveMessage, 1000);

    function saveMessage() {
         handler(message, function(err, message) {
                if(err) {
                    return next(err);
                }

                if(!message) {
                    return callback(null, null);
                }

                var botAnswer        = new Message();
                botAnswer.date       = Date.now();
                botAnswer.user       = me;
                botAnswer.authorUser = false;
                botAnswer.bot        = bot._id;
                botAnswer.text       = message.text;

                botAnswer.save(callback);
        });
    }
}



