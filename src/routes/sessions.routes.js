const {Router} =require("express")

const SessionsController=require("../controllers/SessionsController")
const sessionController= new SessionsController()

const sessionRoutes = Router()
sessionRoutes.post("/",sessionController.create)
sessionRoutes.delete("/",sessionController.destroy)

module.exports= sessionRoutes;
