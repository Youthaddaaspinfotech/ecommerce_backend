import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();  // Load variables from .env file





const dbconnect = async ()=>{
    mongoose.connect(process.env.connectionString).then(()=>{
        console.log("connect successfully")
    }).catch((err)=>{
  console.error("not Connected"+err)
    })
}
export default dbconnect;