const{hash, compare}=require("bcryptjs");
const AppError = require("../utils/AppError");
const { use } = require("express/lib/router");
class UserCreateService{
  constructor(UserRepository){
    this.userRepository = UserRepository;
  }
  async execute({name,email,password}){
    const checkExistUser= await this.userRepository.findByEmail(email);
    if(checkExistUser){
      throw new AppError("Este email já está em uso.");
    };

    const cryptPassword=await hash(password, 8);
   
    const userCreated = await this.userRepository.create({name, email, password:cryptPassword});
    
    return userCreated;
  }
}
module.exports = UserCreateService