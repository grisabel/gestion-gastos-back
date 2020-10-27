'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');

//modelos
var User = require('../models/user');
const jwt = require('../services/jwt');
//const param = require('../routes/user');

function saveUser(req, res){
    //crear objeto de usuario
    var user = new User();
    //recoger parámetros peticion
    var params = req.body;
    //asignar valores al objeto usuario
    if(params.password && params.name && params.email ){
        user.name = params.name;
        user.email = params.email;
        if(params.surmane){
            user.surmane = params.surmane;
        }
        User.findOne({email: user.email.toLowerCase()}, (err, issetUser)=>{
            if(err){
                res.status(500).send({message : 'Error al comprobar el usuario'});
            }else{
                if(!issetUser){
                    //cifrar contraseña
                    bcrypt.hash(params.password, null, null, function(err, hash){
                        user.password = hash;
                        //guardar usuario en bd controlando duplicidades
                        user.save((err, userStored)=>{
                            if(err){
                                res.status(500).send({message : 'Error al guardar el usuario'});
                            }else{
                                if(!userStored){
                                    res.status(404).send({message :'No se ha registrado el usuario. El usuario ya existe.'});
                                }
                                else{
                                    res.status(200).send({message : 'El usuario se ha registrado correctamente'});
                                }
                            }
                        });
                    });
                }else{
                    res.status(408).send({message :'Error. El email ya está registrado'});
                }
            }
        });
       
    }else{
        res.status(400).send({message:'Petición incorrecta. Parámetros del body insuficientes'});
    }
}


function login(req, res){
   
    User.findOne({email: req.body.email.toLowerCase()}, (err, userS)=>{
        if(err){
           return res.status(500).send({message :'Error al comprobar el usuario'});
        }else{
            if(userS){
                bcrypt.compare(req.body.password, userS.password, (err, check)=>{
                    if(err){
                        return  res.status(500).send({message: 'Error al comprobar el usuario'}); 
                    }
                    else{
                        if(req.body.token===null){
                            if(check){
                                return res.status(200).send({token:jwt.createToken(userS)});
                            }else{
                                return res.status(501).send({message:"El usuario y contraseña no coinciden"});
                            }          
                        }else{
                            return res.status(501).send({message:"El usuario ya dispone de token"});
                        }
                    }
                });    
            }else{
                return res.status(404).send({message:"El usuario no está registrado"});
            }
        
        }
    });
}
module.exports = {
    saveUser,
    login
}