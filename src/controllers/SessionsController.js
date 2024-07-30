const{compare}=require("bcryptjs");
const {sign}= require("jsonwebtoken");
const knex =require('../database/knex');
const authConfig=require("../config/auth");
const AppError= require("../utils/AppError");
const { use } = require("express/lib/router");

class SessionsController {
  async create(request,response){
    const {email, password}= request.body;
    
    if(!email || !password){
      throw new AppError("Preencher email e senha",401);
    }

    const user = await knex("users").where({email}).first();
   
    if(!user){
      throw new AppError("Email e/ou senha incorreta",401);
    }
    
    const checkPassword= await compare(password,user.password);

    if(!checkPassword){
      throw new AppError("Email e/ou senha incorreta",401);
       
    }
    
    const {secret, expiresIn}=authConfig.jwt

    const token=sign({},secret,{
      subject: String(user.id),
      expiresIn
    });

    response.cookie("token",token,{
      httpOnly:true,
      sameSite: "none",
      secure:true,
      maxAge: 15 * 60 * 1000
    });

    delete user.password;

    return response.status(200).json({ user }); 
  }

  async destroy(request,response){
    response.clearCookie("token").status(200).json();
  }

}

module.exports= SessionsController;