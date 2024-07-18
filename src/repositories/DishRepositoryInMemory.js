class DishRepositoryCreateInMemory {
  dishs = [];
  users = [{
    id: 1,
    name: "admin",
    email: "admin@admin",
    password: "admin"}
  ];

  
  async addDataBase({ user_id, name, category, price, description}){
    const dish = {
      id: Math.floor(Math.random() * 1000) + 1,
      user_id,
      name,
      category,
      price,
      description
    }
    this.dishs.push(dish)
    return dish;
  };
  
  async findByUserId(user_id){
    return this.users.find(user => user.id === user_id);
  }
}
class DishRepositoryUpdateInMemory {
  dishs = [
    {
      id: 1,
      user_id: 1,
      name: "risoto",
      category: "almoço",
      price: "56",
      description: "arroz e carne",
    },
    {
      id: 2,
      user_id: 2,
      name: "Macarrão",
      category: "janta",
      price: "75",
      description: "camarão e arroz",
    },
  ];
  
  async findByDishId(dish_id){
    return this.dishs.find(dish => dish.id === dish_id);
  }
  async updateDataBase({ dish_id, dish}){
    let updateDish= this.dishs.find(dish => dish.id === dish_id)
    updateDish.name = dish.name
    updateDish.category = dish.category
    updateDish.price = dish.price
    updateDish.description = dish.description

    return updateDish;
  }
}
module.exports = {
  DishRepositoryCreateInMemory,
  DishRepositoryUpdateInMemory
};