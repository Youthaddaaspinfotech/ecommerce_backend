import express from "express";
import userRouter from "./router/user_router.js";
import bodyParser from "body-parser";
import  dbconnect from "./model/connection.js"
const PORT = process.env.PORT || 6666;
dbconnect();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use("/user",userRouter);
app.listen(PORT,()=>{
    console.log("server invoked at link http://localhost:"+PORT);
});