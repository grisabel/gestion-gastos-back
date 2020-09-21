'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_gestion_gastos';

function createToken(user){

    var payload =  {
        sub: user._id,
        name: user.name,
        iat: moment().unix(),
        exp: moment().add(14, 'd').unix()

    }
    return jwt.encode(payload, secret);
};
function decodeToken(token, secret){
    return jwt.decode(token,secret);
}
module.exports = {
    createToken,
    decodeToken
}