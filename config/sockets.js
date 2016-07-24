/**
 * Created by argho on 23.07.2016.
 */
var mongoose  = require('mongoose');
var Contact   = mongoose.model('Contact');
var Message   = mongoose.model('Message');

var handlers  = require('../config/messageHandlers');

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

                Message.find({user: socket.me, bot: socket.bot.id}, function(err, data) {
                    socket.to(data.id).emit('recieveMessage', data);
                })

            });
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

                msg.bot = bot;                       //faster then model.populate
                socket.emit('recieveMessage', msg);
                setTimeout(function() {
                    var botAnswer = new Message();
                    botAnswer.date = Date.now();
                    botAnswer.user = me;
                    botAnswer.authorUser = false;
                    botAnswer.bot  = bot._id;
                    botAnswer.text = handlers[bot.messageHandler](msg.text);

                    botAnswer.save(function(err, answer) {
                        if (err) return next(err);
                        answer.bot = bot;            //faster then model.populate
                        socket.emit('recieveMessage', answer);
                    });
                }, 2000);

            })

        });

        socket.on('disconnect', function(data) {

        });

    });
};