'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/registro', UserController.saveUser);
api.post('/authenticate', UserController.authenticated);
api.post('/login', UserController.login);

module.exports = api;