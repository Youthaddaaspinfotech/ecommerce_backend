import mongoose from "mongoose";

const category = new mongoose.Schema({
    catname:{
        type:String,
        unique: true,
        required: [true," category Name is required"]
    }
    ,
    caticon:{
        type:String,
        unique: true
    }
})

const categoryModel = mongoose.model("categoryCollection",category);

export default categoryModel;