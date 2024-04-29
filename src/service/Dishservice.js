const AppError = require("../utils/AppError");
class DishService{
  constructor(DishRepository){
    this.dishRepository = DishRepository;
  }
  async create({ user_id, name, category, price, description }){
    
    const checkExistUser= await this.dishRepository.findByUserId(user_id);

    if(!checkExistUser){
      throw new AppError("Usuário não encontrado");
    };

    const dishCreated = await this.dishRepository.addDataBase({ user_id, name, category, price, description });
    
    return dishCreated;
  }
  async update({ dish_id, name, category, price, description }){

    const dish= await this.dishRepository.findByDishId(dish_id);

    if(!dish){
      throw new AppError("Prato não cadastrado");
    };
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
  await this.dishRepository.updateDataBase({ dish_id, dish});

  }
}
module.exports = DishService