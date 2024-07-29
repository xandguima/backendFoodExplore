const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class LikesController {
  async add(request, response) {
    const user_id = request.user.id
    const {dish_id} = request.body;

    const like = await knex("like")
    .where({ user_id,dish_id }).first()

    if (like) {
      throw new AppError("Curtida ja existente");
    }

    try {
      await knex("like").insert({
        user_id,
        dish_id
      });

    } catch (error) {
      throw new AppError(error);
    }

    return response.status(201).json();
  }

  async delete(request, response) {
    const user_id = request.user.id
    const { dish_id } = request.params;

    if (!dish_id) {
      throw new AppError("dish_id é necessário", 400);
    }

    const like = await knex("like")
    .where({ user_id,dish_id }).first()
    
    if (!like) {
      throw new AppError("Curtida inexistente");
    }
    await knex("like")
    .where({ dish_id, user_id }).delete();
    

    return response.status(204).json();
  }

  async index(request, response) {
    const user_id = request.user.id;

    const likes = await knex("like")
    .where({ user_id }).select();

    if (!likes) {
      throw new AppError("Curtidas inexistente");
    }
    
    
    return response.status(200).json(likes);
  }
}
module.exports = LikesController