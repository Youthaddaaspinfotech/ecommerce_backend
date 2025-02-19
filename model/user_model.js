import mongoose from "mongoose";

const schemaModal = new mongoose.Schema({
    name:{
        type:String,
        trim:true
  
    },
    email:{
        type:String,
        lowecase:true
    },
    password:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
    // 0-admin , 1 user
    userType:{
         type:Number,
         default:1
    }

},
{timestamps:true}

);
let Model = mongoose.model("userCollection",schemaModal);

export default Model;