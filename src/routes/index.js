const {Router}=require("express")

const routes=Router();

const userRoutes=require("./users.routes");
const dishRoutes=require("./dish.routes");
const sessionRoutes=require("./sessions.routes");

routes.use("/user",userRoutes)
routes.use("/dish",dishRoutes)
routes.use("/session",sessionRoutes)

module.exports=routes