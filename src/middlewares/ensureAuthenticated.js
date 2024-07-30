const {verify}=require("jsonwebtoken");
const authConfig=require("../config/auth");
const AppError= require("../utils/AppError");
const knex = require("../database/knex");

async function ensureAuthenticated(request, response,next){
  const authHeader=request.headers;

  if(!authHeader.cookie){
    throw new AppError("JWT Token não informado",401)
  }

  const [,token]= authHeader.cookie.split('token=');
 
  
  try{
    const{sub:user_id}=verify(token,authConfig.jwt.secret);
    
    const user = await knex("users").where({ id: user_id }).first();
    request.user={
      id:Number(user_id),
      rule:user.rule
    }
    return next();
  }catch{
    throw new AppError("JWT Token inválido",401);
  }
}

module.exports = ensureAuthenticated;