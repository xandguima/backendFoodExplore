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
}
module.exports = UsersController