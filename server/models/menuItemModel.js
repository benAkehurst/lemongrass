'use strict';

var debug = require('debug');
var error = debug('reportModel:error');
var log = debug('reportModel:log');

var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var MenuItem = new Schema({
  name: {
    type: String
  },
  price: {
    type: Number
  },
  description: {
    type: String
  },
  vegetarian: {
    type: Boolean
  },
  imgUrl: {
    type: String
  }
}, {
  timestamps: true
});


MenuItem.set('toJSON', {
  transform: function (doc, ret, options) {
    return ret;
  }
});

module.exports = mongoose.model('MenuItem', MenuItem);
