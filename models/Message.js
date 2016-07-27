var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    bot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    },
    user: {
        type: String
    },
    authorUser: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    seen: {
        type: Date,
        default: null
    }
});

messageSchema.methods.makeSeen = function(callback) {
    this.seen = Date.now();
    this.save(callback);
};

messageSchema.statics.random = function(callback) {
    this.count(function(err, count) {
        if (err) {
            return callback(err);
        }
        var rand = Math.floor(Math.random() * count);
        this.findOne().skip(rand).exec(callback);
    }.bind(this));
};

mongoose.model('Message', messageSchema);