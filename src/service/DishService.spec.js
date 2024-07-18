const DishService = require ("./Dishservice");
const {DishRepositoryCreateInMemory,DishRepositoryUpdateInMemory} = require("../repositories/DishRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("DishService - create", ()=>{

  let dishRepositoryInMemory =null;
  let dishService = null;

  beforeEach(()=>{
    dishRepositoryInMemory = new DishRepositoryCreateInMemory();
    dishService = new DishService(dishRepositoryInMemory);
  });

  it("dish not should be created",async()=>{
    const dish= {
      user_id:2,
      name:"risoto",
      category:"almoço",
      price:"56",
      description:"arroz e carne"
    };

    await expect(dishService.create(dish)).rejects.toEqual(new AppError("Usuário não encontrado"));
    
  });
});   

describe("DishService - update ", ()=>{

  let dishRepositoryInMemory =null;
  let dishService = null;

  beforeEach(()=>{
    dishRepositoryInMemory = new DishRepositoryUpdateInMemory();
    dishService = new DishService(dishRepositoryInMemory);
  });

   
  it("Dish should be updated",async()=>{
    const dish = {
      dish_id:2,
      name:"risoto",
      category:"almoço",
      price:"56",
      description:"arroz e carne"
    };
    const updatedDish = await dishService.update(dish);
    const { name, price, category, description } = dish;
    expect(updatedDish).toMatchObject({ name, price, category, description });
  });
});  
