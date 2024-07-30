const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class IngredientsController {
  async add(request, response) {
    const user_id = request.user.id
    const  {dish_id}  = request.params
    const {ingredients} = request.body;

    const dish = await knex("dish").where({ id:dish_id }).first()

    if (!dish) {
      throw new AppError("Prato não cadastrado");
    }

    const listIngredients = ingredients.map(ingredient => {
      return {
        dish_id,
        user_id,
        name: ingredient
      }
    });
    try {
      await knex("ingredients").insert(listIngredients);

    } catch (error) {
      throw new AppError(error);
    }

    return response.status(201).json();
  }

  async delete(request, response) {
    const { dish_id } = request.params
    await knex("ingredients").where({ dish_id }).delete();

    return response.status(204).json();
  }
}
module.exports = IngredientsController