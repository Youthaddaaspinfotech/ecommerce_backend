import mongoose from "mongoose";
const schemaModal = new mongoose.Schema({
    name:{
        name:String
    },
    email:{
        type:String
    },
    password:{
        type:Number
    },
    phoneNumber:{
        type:Number
    },
    // 0-admin , 1 user
    userType:{
         type:Number,
         default:1
    }

}


);
let Model = mongoose.model("userCollection",schemaModal)

export default Model;