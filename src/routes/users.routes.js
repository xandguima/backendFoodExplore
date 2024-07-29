const {Router}=require("express");
const ensureAuthenticated=require("../middlewares/ensureAuthenticated")
const UsersController=require("../controllers/UserController")


const usersController = new UsersController()

const userRoutes=Router();



userRoutes.post("/",usersController.create);
userRoutes.put("/rule",ensureAuthenticated,usersController.updateRule)


module.exports=userRoutes