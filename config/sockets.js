/**
 * Created by argho on 23.07.2016.
 */
var mongoose  = require('mongoose');
var Contact   = mongoose.model('Contact');
var Message   = mongoose.model('Message');

var handleMessage  = require('../config/messageHandlers');

function sendHistory(bot, me, callback) {
    Message
        .find({user: me, bot: bot._id})
        .sort({date: -1})
        .limit(10)
        .populate('bot')
        .sort({date: 1})
        .exec(callback)
}


module.exports = function (io) {

    io.on('connection', function(socket) {

        socket.emit('connected', {id: socket.id});

        socket.on('join', function(data) {

            socket.join(data.id);

            Contact.find({}, function(err, contacts) {
                if(err){
                    return next(err);
                }

                socket.bot = contacts[0];
                socket.me = data.id;

                sendHistory(socket.bot, socket.me, function(err, data) {
                     socket.emit('recieveHistory', data);
                })
            })
        });

        socket.on('changeContact', function(contact){
            socket.bot = contact;
            sendHistory(socket.bot, socket.me, function(err, data) {
                socket.emit('recieveHistory', data);
            })
        });

        socket.on('sendMessage', function(data) {

            var me     = socket.me;
            var bot    = socket.bot;

            var newMsg  = new Message();
            newMsg.date = Date.now();
            newMsg.user = me;
            newMsg.bot  = bot._id;
            newMsg.text = data.text;

            newMsg.save(function(err, msg) {
                if (err) return next(err);

                socket.emit('recieveMessage', msg);
                handleMessage(me, bot, msg, function(err, answer) {
                    if(err) return next(err);
                    if(answer) {
                        answer = answer.toObject();
                        answer.bot = socket.bot;               //faster then model.populate
                        socket.emit('recieveMessage', answer);
                    }
                });

            })

        });

        socket.on('disconnect', function(data) {

        });

    });
};