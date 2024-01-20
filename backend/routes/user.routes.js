const express=require("express");
const userRouter=express.Router();
const {registerUser,loginUser,getAllIdeas,getFilterIdea}=require("../controller/userController");
const {protect}=require("../middleware/authMiddleWare")

userRouter.get("/ideas",protect,getAllIdeas);
userRouter.get("/filter",protect,getFilterIdea);
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
module.exports=userRouter;

