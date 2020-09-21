'use strict'
//modulos

//modelos
var Spend = require('../models/spend');
var secret = 'clave_secreta_gestion_gastos';
const jwt = require('../services/jwt');

//const param = require('../routes/user');

async function saveSpend(req, res){
    //crear objeto de gasto
   
    if(req.body.capacity && req.body.spend && req.body.date){
        var spend = new Spend();
        spend.capacity= req.body.capacity;
        spend.spend= req.body.spend;
        spend.date= req.body.date;
        spend.comment= req.body.comment;
        var payload= jwt.decodeToken(req.headers.authorization.split(' ')[1],secret )
        spend.user_id= payload.sub;
        
        try {
            await spend.save();
            res.status(200).send({message:'El gasto se ha guardado en la base de datos'})
        } catch (error) {
            res.status(500).send({message:'El gasto no se ha podido llevar a cabo'})
        }

        // deposit.save((err, depositSave)=>{
        //     if(depositSave){
        //         res.status(200).send({message:'El ingreso se ha guardado en la base de datos'})
        //     }
        //     else{
        //         res.status(500).send({message:'El ingreso no se ha podido llevar a cabo'})
        //     }
        // });

    }else{
        res.status(501).send({message:'Error en alguno de los parámetros'})
    }   
} 
function getSpend(req, res){
   
    if(req.query.week && req.query.month && req.query.year){
        
        var payload= jwt.decodeToken(req.headers.authorization.split(' ')[1],secret )
        let user_id= payload.sub;
      
      
       if(req.query.week==="1"){
        Spend.find({user_id:user_id,date: {
            $gte: new Date(req.query.year+"-"+req.query.month+"-01"),
            $lt: new Date(req.query.year+"-"+req.query.month+"-07")
        }},{_id:0, user_id:0,__v:0}).sort({date:1}).exec((err,spends)=>{
            if(err){
                res.status(500).send({message:'ERROR en la consulta'})
            }else{
                res.status(200).send(spends)
            }
            
        });
       }
       if(req.query.week==="2"){
        Spend.find({user_id:user_id,date: {
            $gte: new Date(req.query.year+"-"+req.query.month+"-08"),
            $lt: new Date(req.query.year+"-"+req.query.month+"-14")
        }},{_id:0, user_id:0,__v:0}).sort({date:1}).exec((err,spends)=>{
            if(err){
                res.status(500).send({message:'ERROR en la consulta'})
            }else{
                res.status(200).send(spends)
            }
            
        });
       }
       if(req.query.week==="3"){
        Spend.find({user_id:user_id,date: {
            $gte: new Date(req.query.year+"-"+req.query.month+"-15"),
            $lt: new Date(req.query.year+"-"+req.query.month+"-21")
        }},{_id:0, user_id:0,__v:0}).sort({date:1}).exec((err,spends)=>{
            if(err){
                res.status(500).send({message:'ERROR en la consulta'})
            }else{
                res.status(200).send(spends)
            }
            
        });
       }
       if(req.query.week==="4"){
        Spend.find({user_id:user_id,date: {
            $gte: new Date(req.query.year+"-"+req.query.month+"-22"),
            $lt: new Date(req.query.year+"-"+req.query.month+"-31")
        }},{_id:0, user_id:0,__v:0}).sort({date:1}).exec((err,spends)=>{
            if(err){
                res.status(500).send({message:'ERROR en la consulta'})
            }else{
                res.status(200).send(spends)
            }
            
        });
       }

    }else{
        res.status(501).send({message:'Error en alguno de los parámetros'})
    }
    
}  
function getSpendMonth(req, res){
   
    if(req.query.month && req.query.year){
        
        var payload= jwt.decodeToken(req.headers.authorization.split(' ')[1],secret )
        let user_id= payload.sub;
        Spend.find({user_id:user_id,date: {
            $gte: new Date(req.query.year+"-"+req.query.month+"-01"),
            $lt: new Date(req.query.year+"-"+req.query.month+"-31")
        }},{_id:0, user_id:0,__v:0}).sort({date:1}).exec((err,spends)=>{
            if(err){
                res.status(500).send({message:'ERROR en la consulta'})
            }else{
                res.status(200).send(spends)
            }
            
        });

    }else{
        res.status(501).send({message:'Error en alguno de los parámetros'})
    }
    
}  
function getSpendYear(req, res){
   
    if(req.query.year){
        
        var payload= jwt.decodeToken(req.headers.authorization.split(' ')[1],secret )
        let user_id= payload.sub;
        Spend.find({user_id:user_id,date: {
            $gte: new Date(req.query.year+"-01-01"),
            $lt: new Date(req.query.year+"-12-31")
        }},{_id:0, user_id:0,__v:0}).sort({date:1}).exec((err,spends)=>{
            if(err){
                res.status(500).send({message:'ERROR en la consulta'})
            }else{
                res.status(200).send(spends)
            }
            
        });

    }else{
        res.status(501).send({message:'Error en alguno de los parámetros'})
    }
    
}  
module.exports = {
    saveSpend,
    getSpend,
    getSpendMonth,
    getSpendYear
   
}