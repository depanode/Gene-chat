var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    author: {
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

mongoose.model('Message', messageSchema);