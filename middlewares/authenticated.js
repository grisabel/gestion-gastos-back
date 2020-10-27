'use strict'

var jwt =require('../services/jwt');
var moment = require('moment');
var secret = 'clave_secreta_gestion_gastos';
//const { response } = require('express');

exports.ensureAuth = function(req, res, next){

    if(!req.headers.authorization){
       return res.status(403).send({
            message: 'No tienes autorización'
        })
    }else{
        
        var token = req.headers.authorization.split(" ")[1]
        var payload = jwt.decodeToken(token,secret);
    
        try {
            if(payload.exp <= moment().unix()){
                res.status(401).send({message:'El token ha expirado'})
            }  
            req.token=token
        } catch (e) {
            return res.status(404).send({
                message: 'El token no es válido'
            });
        }
        next()
    }
};