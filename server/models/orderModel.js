'use strict';

var debug = require('debug');
var error = debug('reportModel:error');
var log = debug('reportModel:log');

var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var Order = new Schema({
  items: {
    type: Array
  },
  total_price: {
    type: Number
  }
}, {
  timestamps: true
});


Order.set('toJSON', {
  transform: function (doc, ret, options) {
    return ret;
  }
});

module.exports = mongoose.model('Order', Order);
