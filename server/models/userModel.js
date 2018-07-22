'use strict';

var debug = require('debug');
var error = debug('reportModel:error');
var log = debug('reportModel:log');

var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var User = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    street: {
      type: String
    },
    houseNumber: {
      type: String
    },
    postCode: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    orders_history: {
      type: Array
    }
},
{
    timestamps: true
});


User.set('toJSON', {
    transform: function (doc, ret, options) {
        return ret;
    }
});

module.exports = mongoose.model('User', User);
