require("dotenv").config();
const cors=require("cors");
const express = require("express");
const PORT = process.env.PORT;
const userRouter=require("./routes/user.routes");
const ideaRouter=require('./routes/idea.routes')
const app = express();
const db = require("./db/db");
app.use(cors());
app.use(express.json());
app.use("/user",userRouter);
app.use("/user/idea",ideaRouter);

app.get("/",(req,res)=>
{
    res.send({
        api:"Dummy api is working"
    })
})

const server = app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`);
});
