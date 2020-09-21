'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpendSchema = Schema({
    capacity: String,
    spend: Number,
    date: Date,
    comment: String,
    user_id: String
});

module.exports = mongoose.model('Spend', SpendSchema);