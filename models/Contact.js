/**
 * Created by argho on 23.07.2016.
 */
var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    online: {
        type: Boolean
    },
    avatar: {
        type: String
    },
    description: {
        type: String
    }
});

contactSchema.methods.goOnline = function(callback) {
    this.online = true;
    this.save(callback);
};

contactSchema.methods.goOffline = function(callback) {
    this.online = false;
    this.save(callback);
};

mongoose.model('Contact', contactSchema);