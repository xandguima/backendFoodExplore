const {Router}=require("express");
const ensureAuthenticated=require("../middlewares/ensureAuthenticated")

const IngredientsController = require("../controllers/IngredientsController")

const ingredientsController = new IngredientsController()

const ingredientRoutes=Router();

ingredientRoutes.use(ensureAuthenticated);


ingredientRoutes.post("/:dish_id",ingredientsController.add);
ingredientRoutes.delete("/:dish_id",ingredientsController.delete)


module.exports = ingredientRoutes