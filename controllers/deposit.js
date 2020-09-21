'use strict'
//modulos

//modelos
var Deposit = require('../models/deposit');
var secret = 'clave_secreta_gestion_gastos';
const jwt = require('../services/jwt');
const deposit = require('../models/deposit');

//const param = require('../routes/user');

async function saveDeposit(req, res){
    //crear objeto de ingreso
  
    if(req.body.capacity && req.body.deposit && req.body.date){
        var deposit = new Deposit();
        deposit.capacity= req.body.capacity;
        deposit.deposit= req.body.deposit;
        deposit.date= req.body.date;
        deposit.comment= req.body.comment;
        var payload= jwt.decodeToken(req.headers.authorization.split(' ')[1],secret )
        deposit.user_id= payload.sub;
        
        try {
            await deposit.save();
            res.status(200).send({message:'El ingreso se ha guardado en la base de datos'})
        } catch (error) {
            res.status(500).send({message:'El ingreso no se ha podido llevar a cabo'})
        }

    }else{
        res.status(501).send({message:'Error en alguno de los parámetros'})
    }
    
}  
function getDeposit(req, res){
   
    if(req.query.week && req.query.month && req.query.year){
        
        var payload= jwt.decodeToken(req.headers.authorization.split(' ')[1],secret )
        let user_id= payload.sub;
      console.log(req.query.week)
      
       if(req.query.week==="1"){
        Deposit.find({user_id:user_id,date: {
            $gte: new Date(req.query.year+"-"+req.query.month+"-01"),
            $lt: new Date(req.query.year+"-"+req.query.month+"-07")
        }},{_id:0, user_id:0,__v:0}).sort({date:1}).exec((err,deposits)=>{
            if(err){
                res.status(500).send({message:'ERROR en la consulta'})
            }else{
                res.status(200).send(deposits)
            }
            
        });
       }
       if(req.query.week==="2"){
        Deposit.find({user_id:user_id,date: {
            $gte: new Date(req.query.year+"-"+req.query.month+"-08"),
            $lt: new Date(req.query.year+"-"+req.query.month+"-14")
        }},{_id:0, user_id:0,__v:0}).sort({date:1}).exec((err,deposits)=>{
            if(err){
                res.status(500).send({message:'ERROR en la consulta'})
            }else{
                res.status(200).send(deposits)
            }
            
        });
       }
       if(req.query.week==="3"){
        Deposit.find({user_id:user_id,date: {
            $gte: new Date(req.query.year+"-"+req.query.month+"-15"),
            $lt: new Date(req.query.year+"-"+req.query.month+"-21")
        }},{_id:0, user_id:0,__v:0}).sort({date:1}).exec((err,deposits)=>{
            if(err){
                res.status(500).send({message:'ERROR en la consulta'})
            }else{
                res.status(200).send(deposits)
            }
            
        });
       }
       if(req.query.week==="4"){
        Deposit.find({user_id:user_id,date: {
            $gte: new Date(req.query.year+"-"+req.query.month+"-22"),
            $lt: new Date(req.query.year+"-"+req.query.month+"-31")
        }},{_id:0, user_id:0,__v:0}).sort({date:1}).exec((err,deposits)=>{
            if(err){
                res.status(500).send({message:'ERROR en la consulta'})
            }else{
                res.status(200).send(deposits)
            }
            
        });
       }

    }else{
        res.status(501).send({message:'Error en alguno de los parámetros'})
    }
    
}  
function getDepositMonth(req, res){
   
    if(req.query.month && req.query.year){
        
        var payload= jwt.decodeToken(req.headers.authorization.split(' ')[1],secret )
        let user_id= payload.sub;

        Deposit.find({user_id:user_id,date: {
            $gte: new Date(req.query.year+"-"+req.query.month+"-01"),
            $lt: new Date(req.query.year+"-"+req.query.month+"-31")
        }},{_id:0, user_id:0,__v:0}).sort({date:1}).exec((err,deposits)=>{
            if(err){
                res.status(500).send({message:'ERROR en la consulta'})
            }else{
              
                res.status(200).send(deposits)
            }
            
        });
       

    }else{
        res.status(501).send({message:'Error en alguno de los parámetros'})
    }
    
}  
function getDepositYear(req, res){
   
    if(req.query.year){
        
        var payload= jwt.decodeToken(req.headers.authorization.split(' ')[1],secret )
        let user_id= payload.sub;

        Deposit.find({user_id:user_id,date: {
            $gte: new Date(req.query.year+"-01-01"),
            $lt: new Date(req.query.year+"-12-31")
        }},{_id:0, user_id:0,__v:0}).sort({date:1}).exec((err,deposits)=>{
            if(err){
                res.status(500).send({message:'ERROR en la consulta'})
            }else{
                res.status(200).send(deposits)
            }
            
        });
       

    }else{
        res.status(501).send({message:'Error en alguno de los parámetros'})
    }
    
}  
module.exports = {
    saveDeposit,
    getDeposit,
    getDepositMonth,
    getDepositYear
   
}