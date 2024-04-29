class DishRepositoryInMemory {
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

module.exports = DishRepositoryInMemory;