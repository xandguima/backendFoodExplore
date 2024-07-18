const AppError = require("../utils/AppError");

class DishService {
  constructor(DishRepository) {
    this.dishRepository = DishRepository;
  }
  async create({ user_id, name, category, price, description }) {

    const checkExistUser = await this.dishRepository.findByUserId(user_id);

    if (!checkExistUser) {
      throw new AppError("Usuário não encontrado");
    };

    const dishCreated = await this.dishRepository.addDataBase({ user_id, name, category, price, description });

    return dishCreated;
  }
  async update({ dish_id, name, category, price, description }) {
    const dish = await this.dishRepository.findByDishId(dish_id);

    if (!dish) {
      throw new AppError("Prato não cadastrado");
    };
    name && (dish.name = name);
    category && (dish.category = category);
    price && (dish.price = price);
    description && (dish.description = description);

    const dishUpdated = await this.dishRepository.updateDishDataBase({ dish_id, dish });
    return dishUpdated;

  }
}
module.exports = DishService