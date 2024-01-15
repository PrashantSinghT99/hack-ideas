const express=require("express");
const userRouter=express.Router();


userRouter.get("/",(req,res)=>
{
res.send({message:"Response from user router"});
})



module.exports=userRouter;