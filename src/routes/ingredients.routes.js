const {Router}=require("express");
const ensureAuthenticated=require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization=require("../middlewares/verifyUserAuthorization")
const IngredientsController = require("../controllers/IngredientsController")

const ingredientsController = new IngredientsController()

const ingredientRoutes=Router();

ingredientRoutes.use(ensureAuthenticated);


ingredientRoutes.post("/:dish_id",verifyUserAuthorization("admin"),ingredientsController.add);
ingredientRoutes.delete("/:dish_id",verifyUserAuthorization("admin"),ingredientsController.delete)


module.exports = ingredientRoutes