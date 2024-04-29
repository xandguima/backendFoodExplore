const DishService = require ("./Dishservice");
const DishRepositoryInMemory = require("../repositories/DishRepositoryInMemory");
const AppError = require("../utils/AppError");


describe("DishService- create", ()=>{

  let dishRepositoryInMemory =null;
  let dishService = null;

  beforeEach(()=>{
    dishRepositoryInMemory = new DishRepositoryInMemory();
    dishService = new DishService(dishRepositoryInMemory);
  });

   
  it("user not should be created",async()=>{
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
    dishRepositoryInMemory = new DishRepositoryInMemory();
    dishService = new DishService(dishRepositoryInMemory);
  });

   
  it("Dish not should be created",async()=>{
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