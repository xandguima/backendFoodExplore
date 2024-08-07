const {Router}=require("express")

const routes=Router();

const userRoutes=require("./users.routes");
const dishRoutes=require("./dish.routes");
const sessionRoutes=require("./sessions.routes");
const ingredientRoutes = require("./ingredients.routes");
const likeRoutes = require("./like.routes");

routes.use("/user",userRoutes);
routes.use("/dish",dishRoutes);
routes.use("/session",sessionRoutes);
routes.use("/ingredient",ingredientRoutes);
routes.use("/like",likeRoutes);


module.exports = routes