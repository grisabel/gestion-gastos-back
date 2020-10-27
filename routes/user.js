'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();


api.post('/registro', UserController.saveUser);
api.post('/login', UserController.login);

module.exports = api;