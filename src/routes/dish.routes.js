const multer =require("multer");
const {Router}=require("express");
const uploadConfig=require("../config/upload")
const ensureAuthenticated=require("../middlewares/ensureAuthenticated")

const DishController = require("../controllers/DishController")
const DishImgController=require("../controllers/DishImageController")

const dishController = new DishController()
const dishImgController = new DishImgController();

const dishRoutes=Router();

dishRoutes.use(ensureAuthenticated);

const upload = multer(uploadConfig.MULTER);


dishRoutes.post("/",dishController.create);
dishRoutes.patch("/imgDish/:dish_id",upload.single("imgDish"),dishImgController.change)
dishRoutes.put("/:dish_id",dishController.update)
dishRoutes.get("/:dish_id",dishController.show)
dishRoutes.get("/",dishController.index);

module.exports = dishRoutes