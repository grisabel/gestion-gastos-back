'use strict'

var express = require('express');
var DepositController = require('../controllers/deposit');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/AniadirIngreso',md_auth.ensureAuth, DepositController.saveDeposit);
api.get('/ObtenerIngreso', md_auth.ensureAuth,DepositController.getDeposit);
api.get('/ObtenerIngresoMes',md_auth.ensureAuth, DepositController.getDepositMonth);
api.get('/ObtenerIngresoAnio',md_auth.ensureAuth, DepositController.getDepositYear);


module.exports = api;