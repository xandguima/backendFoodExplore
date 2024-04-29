const knex=require("../database/knex");

class DishRepository {

  async findByUserId(user_id){
    const checkExistUser = await knex("users").where({ id: user_id }).first();

    return checkExistUser;
  };

  async findByDishId(dish_id){
    const checkExistDish = await knex("dish").where({ id: dish_id }).first();

    return checkExistDish;
  };


  async addDataBase({ user_id, name, category, price, description}){
    const dish_id = await knex("dish").insert({
      user_id,
      name,
      category,
      price,
      description
    });
    
    return dish_id;
  }

  async updateDataBase({ dish_id, dish}){
    await knex("dish").where({ id: dish_id }).update({ dish });
  }
}

module.exports=DishRepository