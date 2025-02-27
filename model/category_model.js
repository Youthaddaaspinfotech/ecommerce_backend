import mongoose from "mongoose";

const category = new mongoose.Schema({
    catname:{
        type:String,
},
    subcatname:{
        type:String
    },
    caticon:{
        type:String,
       
    },
    parentId:{
        type:mongoose.ObjectId,
        ref:"categorycollections",
        default:"000000000000000000000000"

    },
    description:{
        type:String
    },
    status:{
        type:Number,
        default:1
    }
},{timestamps:true})

const categoryModel = mongoose.model("categoryCollection",category);

export default categoryModel;