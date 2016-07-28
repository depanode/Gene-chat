/**
 * Created by argho on 23.07.2016.
 */
var mongoose  = require('mongoose');
var Contact   = mongoose.model('Contact');
var Message   = mongoose.model('Message');

var handleMessage  = require('../config/messageHandlers');
var commands       = require('../config/commands');

module.exports = function (io) {

    io.on('connection', function(socket) {

        socket.emit('connected', {id: socket.id});

        socket.on('join', join);

        socket.on('changeContact', changeContact);

        socket.on('sendMessage', sendMessage);

        socket.on('disconnect', disconnect);

        socket.on('makeMessageSeen', makeMessageSeen);

        ///////////////////////////////////////////////////

        function join(data) {
            socket.join(data.id);
            socket.me = data.id;
        }

        function changeContact(contact){

            if(socket.timerId) {
                clearTimeout(socket.timerId);
                socket.timerId = null;
            }

            Contact.findOne({_id: contact._id}, function(err, contact) {
                if(err){
                    return next(err);
                }

                socket.bot = contact;

                sendHistory(socket.bot, socket.me, function(err, data) {
                    if(err)  return next(err);
                    socket.emit('recieveHistory', data);

                    if(contact.standAlone && contact.online) {
                        handleMessage(socket, null, function(err, answer) {
                            if(err) return next(err);

                            if(answer) {
                                Message.populate(answer, 'bot', function(err, data) {
                                    socket.emit('recieveMessage', data);
                                });
                            }
                        });
                    }
                })
            })
        }

        function sendMessage(data) {
            var me     = socket.me;
            var bot    = socket.bot;

            var command = commands[data.text];

            if(command) {
                command.handler(data, bot, socket, function(msg, bot, action, event) {
                    socket.emit(event, bot);
                    if(action === 'broadcast'){
                        socket.broadcast.emit(event, bot);
                    }
                })
            } else {

                var newMsg  = new Message();
                newMsg.date = Date.now();
                newMsg.user = me;
                newMsg.bot  = bot._id;
                newMsg.text = data.text;
                newMsg.seen = data.authorUser ? Date.now() : null;

                newMsg.save(function(err, msg) {
                    if (err) return next(err);

                    socket.emit('recieveMessage', msg);

                    if(bot.online) {
                        handleMessage(socket, msg, function(err, answer) {
                            if(err) return next(err);
                            if(answer) {
                                Message.populate(answer, 'bot', function(err, data) {
                                    socket.emit('recieveMessage', data);
                                });
                            }
                        });
                    }
                })
            }
        }

        function makeMessageSeen(message) {

            Message.findOne({_id: message._id}, function(err, message){
                if(err) {
                    return next(err);
                }

                if(message) {
                    message.makeSeen(function(err) {
                        if(err) {
                            return next(err);
                        }
                    })
                }
            })
        }

        function disconnect(data) {

        }

    });
};

function sendHistory(bot, me, callback) {
    Message
        .find({user: me, bot: bot._id})
        .populate('bot')
        .exec(callback)
}