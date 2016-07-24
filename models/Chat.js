var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    bot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    },
    user: {
        type: String
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

chatSchema.methods.addMessage = function(message, cb) {
    this.messages.push(message._id);
    this.save(cb);
};

mongoose.model('Chat', chatSchema);