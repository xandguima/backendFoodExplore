const multer =require("multer");
const {Router}=require("express");

const uploadConfig=require("../config/upload")
const ensureAuthenticated=require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization=require("../middlewares/verifyUserAuthorization")
const DishController = require("../controllers/DishController")
const DishImgController=require("../controllers/DishImageController")


const dishController = new DishController()
const dishImgController = new DishImgController();

const dishRoutes=Router();

dishRoutes.use(ensureAuthenticated);

const upload = multer(uploadConfig.MULTER);


dishRoutes.post("/",verifyUserAuthorization("admin"),dishController.create);
dishRoutes.patch("/imgDish/:dish_id",upload.single("imgDish"),verifyUserAuthorization("admin"),dishImgController.change)
dishRoutes.put("/:dish_id",verifyUserAuthorization("admin"),dishController.update);

dishRoutes.get("/:dish_id",dishController.show)
dishRoutes.get("/",dishController.index);

module.exports = dishRoutes