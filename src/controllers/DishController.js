const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishController {
  async create(request, response) {
    const user_id = request.user.id
    const { name, category, ingredients, price, description } = request.body;

    const checkExistUser = await knex("users").where({ id: user_id })

    if (checkExistUser.length == 0) {
      throw new AppError("Usuário não encontrado");
    }

    try {
      const [dish_id] = await knex("dish").insert({
        user_id,
        name,
        category,
        price,
        description
      });
      const listIngredients = ingredients.map(ingredient => {
        return {
          dish_id,
          name: ingredient,
          user_id
        }
      })
      await knex("ingredients").insert(listIngredients);

    } catch (error) {
      throw new AppError(error);
    }


    return response.status(201).json();
  }

  async update(request, response) {
    const { dish_id } = request.params
    const { name, category, ingredients, price, description } = request.body;

    const dish = await knex("dish").where({ id:dish_id }).first();

    if (!dish) {
      throw new AppError("Prato não cadastrado");
    }
  
    if (name) {
      dish.name = name
    }
    if (category) {
      dish.category = category
    }
    if (price) {
      dish.price = price
    }
    if (description) {
      dish.description = description
    }
    

    await knex("dish").where({ id:dish_id }).update(dish)
  
    return response.status(200).json({dish});

  }

}
module.exports = DishController