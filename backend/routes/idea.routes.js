const express=require("express");
const ideaRouter=express.Router();
const {addIdea,editIdea}=require("../controller/ideaController")
const {protect}=require("../middleware/authMiddleWare")

ideaRouter.post("/addIdea",protect,addIdea);
ideaRouter.put("/editIdea/:id",protect,editIdea);

module.exports=ideaRouter;