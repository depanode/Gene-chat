var express     = require('express');
var router      = express.Router();
var mongoose    = require('mongoose');
var bots        = require('../config/bots');

var Contact     = mongoose.model('Contact');
var Message     = mongoose.model('Message');


router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './', 'index.html'));
});

router.get('/contacts', function (req, res) {
    Contact.find({}, function(err, contacts) {
        if (err) {
            return next(err);
        }
        ////////                           if there is no bots in db - add them
        if(!contacts.length) {
            bots.forEach(function(bot) {
                bot = new Contact();
            });
            Contact.collection.insert(bots, function(err, contacts) {
                if(err) {
                    return next(err);
                }
                console.log('Bots was added');
                res.json(contacts);
            })
        } else {
            res.json(contacts);
        }
    })
});

module.exports = router;