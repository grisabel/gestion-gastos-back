'use strict'

var express = require('express');
var SpendController = require('../controllers/spend');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/AniadirGasto',md_auth.ensureAuth, SpendController.saveSpend);
api.get('/ObtenerGasto',md_auth.ensureAuth, SpendController.getSpend);
api.get('/ObtenerGastoMes',md_auth.ensureAuth, SpendController.getSpendMonth);
api.get('/ObtenerGastoAnio',md_auth.ensureAuth, SpendController.getSpendYear);

module.exports = api;