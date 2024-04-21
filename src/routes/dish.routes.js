const multer =require("multer");
const {Router}=require("express");
const uploadConfig=require("../config/upload")
const ensureAuthenticated=require("../middlewares/ensureAuthenticated")

const DishController = require("../controllers/DishController")
const DishImgController=require("../controllers/DishImage")

const dishController = new DishController()
const dishImgController = new DishImgController();

const dishRoutes=Router();

dishRoutes.use(ensureAuthenticated);

const upload = multer(uploadConfig.MULTER);


dishRoutes.post("/",dishController.create);
dishRoutes.patch("/imgDish/:dish_id",upload.single("imgDish"),dishImgController.change)
dishRoutes.put("/:dish_id",ensureAuthenticated,dishController.update)

//userRoutes.delete("/",ensureAuthenticated,usersController.delete)

//userRoutes.patch("/avatar",ensureAuthenticated,upload.single("avatar"),userAvatarController.update)

module.exports = dishRoutes