/**
 * Created by argho on 23.07.2016.
 */
var mongoose  = require('mongoose');
var Contact   = mongoose.model('Contact');
var Message   = mongoose.model('Message');
var Chat      = mongoose.model('Chat');

module.exports = function (io) {

    io.on('connection', function(socket) {
        console.log(socket.id);

        socket.emit('joined', {id: socket.id});

        socket.on('join', function(data) {
            socket.join(data.id);
        });

        socket.on('sendMessage', function(data, fn) {
console.log(data);
            /*var myId     = data.from._id;
            var friendId = data.to._id;

            var query = {
                participants: {
                    $all: [myId, friendId]
                }
            };

            Chat.find(query, function(err, chat) {
                if (err) return next(err);

                var newMsg = new Message();
                newMsg.chat = chat._id;
                newMsg.date = Date.now();
                newMsg.author = myId;
                newMsg.body = data.msg;

                newMsg.save(function(err, msg) {
                    if (err) return next(err);

                    chat.addMessage(msg, function(err) {
                        if (err) return next(err);

                        msg.populate('author', function(err, msg) {
                            socket.to(friendId).emit('new message', msg);
                            fn(msg);
                        });
                    });
                })
            })*/
        });

        socket.on('disconnect', function(data) {

        });

    });
};