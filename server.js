import express from "express";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import  dbconnect from "./model/connection.js"
import userRouter from "./router/user_router.js";
import  categoryRouter from "./router/category_router.js"

const PORT = process.env.PORT || 6666;
dbconnect();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(fileUpload());

app.use("/user",userRouter);
app.use("/category",categoryRouter);

app.listen(PORT,()=>{
    console.log("server invoked at link http://localhost:"+PORT);
});