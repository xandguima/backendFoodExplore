const LikesController = require("../controllers/LikeDishsController");
const ensureAuthenticated=require("../middlewares/ensureAuthenticated");
const {Router}=require("express");


const likeRoutes=Router();
const likeController = new LikesController();


likeRoutes.use(ensureAuthenticated);

likeRoutes.post("/",likeController.add);
likeRoutes.delete("/:dish_id",likeController.delete);
likeRoutes.get("/",likeController.index);


module.exports = likeRoutes
