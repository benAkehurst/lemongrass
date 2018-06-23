'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Menu = new Schema({
  menu: {
    type: Object,
    ref: 'menu'
  }
});

module.exports = mongoose.model('Menu', Menu);
