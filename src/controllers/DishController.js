const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const DishRepository = require("../repositories/DishRepository");
const DishService = require("../service/Dishservice");


class DishController {
  async create(request, response) {
    const user_id = request.user.id
    const { name, category, price, description } = request.body;

    const dishRepository = new DishRepository();
    const dishService = new DishService(dishRepository);
    const id =await dishService.create({name, category, price, description, user_id});

    return response.status(201).json({ id });
  }

  async update(request, response) {
    const { dish_id } = request.params
    const { name, category, price, description } = request.body;
    const dishRepository = new DishRepository();
    const dishService = new DishService(dishRepository);
    const dish = await dishService.update({ dish_id, name, category, price, description });

    return response.status(200).json({ dish });

  }

  async show(request, response) {
    const { dish_id } = request.params

    const dish = await knex("dish").where({ id: dish_id }).first()
    const ingredients = await knex("ingredients").where({ dish_id }).orderBy("name")
    if (!dish) {
      throw new AppError("Prato não encontrada")
    }

    return response.json({
      dish,
      ingredients
    })
  }
  async index(request, response) {
    const { search } = request.query

    let dish = await knex("dish").whereLike("name", `%${search}%`).orderBy("name");

    if (search) {
      const ingredient = await knex("ingredients").whereLike("name", `%${search}%`).orderBy("name");
      let dish_id = [];

      if (ingredient.length > 0) {
        ingredient.forEach(ingredient => {
          dish_id.push(ingredient.dish_id)
        });

        for (let i = 0; i < dish_id.length; i++) {
          dish.push(await knex("dish").where({ id: dish_id[i] }).first())
        }
      }

    }

    return response.json(dish)
  }

}
module.exports = DishController