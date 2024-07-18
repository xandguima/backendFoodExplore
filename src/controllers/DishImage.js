const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishImgController {
  async change(request, response) {
    const { dish_id } = request.params
    const dishImg = request.file?.filename;

    const diskStorage = new DiskStorage()

    const dish = await knex("dish").where({ id: dish_id }).first();

    if (!dish) {
      throw new AppError("Prato não Cadastrado", 404)
    };
   

    if (dish.imgDish) {
      await diskStorage.deleteFile(dish.imgDish)
    }
    const filename = await diskStorage.saveFile(dishImg)
    dish.imgDish = filename
   
    try {
      await knex("dish").where({ id: dish_id }).update(dish)
    }
    catch (error) {
      throw new AppError(error)
    }

    return response.json()

  }

}

module.exports = DishImgController