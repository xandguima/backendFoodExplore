const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UserValidatedController {
  async index(request, response) {
    const { user }= request
    if(!user){
      throw new AppError("user not found",401);
    }
    const checkUserExist = await knex("users").where({ id: user.id }).first();

    if (!checkUserExist) {
      throw new AppError("unauthorized",401);
    }
    
    return response.status(200).json();
  }


}
module.exports = UserValidatedController