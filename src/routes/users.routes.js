const {Router}=require("express");
const ensureAuthenticated=require("../middlewares/ensureAuthenticated")
const UsersController=require("../controllers/UserController")
const UserValidatedController = require("../controllers/UserValidatedController")

const userValidatedController = new UserValidatedController()
const usersController = new UsersController()

const userRoutes=Router();


userRoutes.post("/",usersController.create);
userRoutes.put("/rule",ensureAuthenticated,usersController.updateRule);
userRoutes.get("/validated",ensureAuthenticated,userValidatedController.index);


module.exports=userRoutes