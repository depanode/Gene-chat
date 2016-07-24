/**
 * Created by argho on 24.07.2016.
 */
var mongoose = require('mongoose');
var Message   = mongoose.model('Message');

module.exports = {
    echo: function(message) {
        return message;
    },
    reverse: function(message) {
        return message.split('').reverse().join('');
    },
    spam: function(callback) {
        Message.random(callback);
    },
    ignore: function() {
        return '';
    }
};