const express=require("express");
const ideaRouter=express.Router();
const {addIdea,editIdea,updateDislike,updateLike,deleteIdea}=require("../controller/ideaController")
const {protect}=require("../middleware/authMiddleWare")

ideaRouter.post("/addIdea",protect,addIdea);
ideaRouter.put("/editIdea/:id",protect,editIdea);
ideaRouter.delete("/deleteIdea/:ideaId",protect,deleteIdea);
ideaRouter.put("/editIdea/:ideaId/like",protect,updateLike);
ideaRouter.put("/editIdea/:ideaId/dislike",protect,updateDislike);

module.exports=ideaRouter;