const express=require("express");
const ideaRouter=express.Router();
const {addIdea}=require("../controller/ideaController")
const {protect}=require("../middleware/authMiddleWare")

ideaRouter.post("/addIdea",protect,addIdea);


module.exports=ideaRouter;