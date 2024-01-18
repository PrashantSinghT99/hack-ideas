const express=require("express");
const userRouter=express.Router();
const {registerUser,loginUser,getAllIdeas}=require("../controller/userController");
const {protect}=require("../middleware/authMiddleWare")

userRouter.get("/ideas",protect,getAllIdeas);
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
module.exports=userRouter;

