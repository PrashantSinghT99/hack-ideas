const express=require("express");
const userRouter=express.Router();
const {registerUser,loginUser,getAllNotes}=require("../controller/userController");
const {protect}=require("../middleware/authMiddleWare")

userRouter.get("/notes",protect,getAllNotes);
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
module.exports=userRouter;

