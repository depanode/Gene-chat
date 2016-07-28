/**
 * Created by argho on 24.07.2016.
 */
var mongoose = require('mongoose');
var Message  = mongoose.model('Message');

var handlers = {
    echo    : echo,
    reverse : reverse,
    spam    : spam,
    ignore  : ignore,
    random  : random
};

module.exports = handleMessage;

function handleMessage(socket, message, callback) {

    var handler = handlers[socket.bot.messageHandler];

    handler(socket, message, function(err, message) {

        if(err) {
            return next(err);
        }

        if(!message) {
            return callback(null, null);
        }

        var botAnswer        = new Message();
        botAnswer.date       = Date.now();
        botAnswer.user       = socket.me;
        botAnswer.authorUser = false;
        botAnswer.bot        = socket.bot._id;
        botAnswer.text       = message.text;

        botAnswer.save(callback);
    });
}

function echo(socket, message, callback) {
    socket.timerId = setTimeout(function() {
        callback(null, message);
    }, 1000);
}

function reverse(socket, message, callback) {
    var msg = message.text.split('').reverse().join('');
    message.text = msg;
    socket.timerId = setTimeout(function() {
        callback(null, message);
    }, 3 * 1000);
}

function spam(socket, message, callback) {
    var delay;

    function generateDelay() {
        delay = Math.floor(10 + Math.random() * (120 + 1 - 10));
        console.log('Next message after ' + delay + ' sec');
    }

    function randomize() {
        socket.timerId = setTimeout(function() {
            Message.random(callback);
            generateDelay();
            randomize();
        }, delay * 1000);
    }
    generateDelay();
    randomize();
}

function ignore(socket, message, callback) {
    callback(null, null);
}

function random(socket, message, callback) {
    socket.timerId = setTimeout(function() {
        Message.random(callback);
    }, 1000);
}

