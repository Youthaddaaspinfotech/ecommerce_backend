import mongoose from "mongoose";

const productSchema = new mongoose.Schema({


    name:{
        type:String,
        required:true,
        trime:true
    },
    
    description:{
        type:String,
        required:true,
        trime:true
    },
    catid:{
        type:String,
        required:true,
        trim:true
    },
    brand:{
        type:String,
        trime:true
    },
    price: {
        type: Number,
        required: true,
        min: 0
      },
     producticon:{
        type:String,
        required:true
      },
      status: {
        type: Number,
        default: 1 
      }



},  { timestamps: true });

const productModel = mongoose.model("productCollection", productSchema);

export default productModel;