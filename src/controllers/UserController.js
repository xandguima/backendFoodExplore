const knex=require("../database/knex");
const{hash, compare}=require("bcryptjs");
const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../service/UserCreateservice");

class UsersController{
  async create(request,response){
    const {name, email, password}=request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);
    await userCreateService.execute({name, email, password});
    
    return response.status(201).json();
  }

  async update(request,response){
    const{ name,email,oldPassword,newPassword }=request.body
    const user_id = request.user.id
   

   
    const user= await knex("users").where({id:user_id});
  
    if(user.length==0){
      throw new AppError("Usuário não encontrado");
    }  
   
  
    if(email){
     const checkEmail = await knex("users").where({email}); 
     if(checkEmail.length!==0 && checkEmail[0].id!==user[0].id){
        throw new AppError("Este e-mail já está em uso");
      }
    } 
     
    user[0].name = name ?? user[0].name
    user[0].email = email ?? user[0].email
    

    if(newPassword && !oldPassword){
      throw new AppError("Para redefinir a senha é necessario informar a senha antiga")
    }
    if(!newPassword && oldPassword){
     throw new AppError("Para redefinir a senha é necessario informar a nova senha")
    }
    
    if(newPassword && oldPassword){
      const checkPassword= await compare(oldPassword,user[0].password)
      if(!checkPassword){
        throw new AppError("A senha antiga não confere")
      }
      user[0].password= await hash(newPassword,8)
    }
    

    await knex("users").where({id:user_id}).update({
      name:user[0].name,
      email:user[0].email,
      password:user[0].password,
      updated_at:knex.fn.now()
    })
    

    return response.status(200).json();

  }
  
}
module.exports = UsersController