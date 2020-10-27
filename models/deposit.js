'use strict'

const moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DepositSchema = Schema({
    capacity: String,
    deposit: Number,
    date: Date,
    comment: String,
    user_id: String
});

module.exports = mongoose.model('Deposit', DepositSchema);