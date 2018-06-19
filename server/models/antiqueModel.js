'use strict';

var debug = require('debug');
var error = debug('reportModel:error');
var log = debug('reportModel:log');

var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');


var Schema = mongoose.Schema;

var Antique = new Schema({
    name: {
        type: String
    },
    artist: {
        type: String
    },
    year: {
        type: String
    },
    category: {
        type: String
    },
    subCategory: {
        type: String
    },
    signed: {
        type: Boolean
    },
    boughtPrice: {
        type: String
    },
    SoldPrice: {
        type: String
    },
    value: {
        type: Array
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    condition: {
        type: String
    },
    width: {
        type: String
    },
    height: {
        type: String
    },
    depth: {
        type: String
    },
    material: {
        type: String
    },
    location: {
        type: String
    },
    provenance: {
        type: String
    },
    provenanceImage: {
        type: String
    },
    status: {
        type: String
    }
}, 
{
    timestamps: true
});


Antique.set('toJSON', {
    transform: function (doc, ret, options) {
        return ret;
    }
});

module.exports = mongoose.model('Antique', Antique);
