var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    },
    date: {
        type: Date,
        default: Date.now
    },
    body: {
        type: String
    }
});

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