import  categorySchemaModel from "../model/category_model.js";
import utility from "../core/utility.js"
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url"; // ✅ Import this properly

export const saveCategory = async (req, res) => {

 // agar subcategory add karna hai to parentid bhi dena to add ho jaye gi
    // console.log(req.files)// file ke data ko recive karne ke liye use hota hai 
  
        const { caticon} = req.files;  // Extract category name
        // console.log(caticon);    
        // Check if a file is uploaded
        let CategorySchemaModel ;
       
        if (req.files && req.files.caticon) {
           var  catImg = await utility.fileUploadData(req.files.caticon, "categoryicon");
        }
       else{
            var catImg = "";
            }
       try {

        CategorySchemaModel =  new categorySchemaModel(
          {...req.body,"caticon":catImg}
        )
           

        const newcategorySchemaModel = await CategorySchemaModel.save();
       


        // res.send({ code: 200, msg: "Category saved successfully!","data":newcategorySchemaModel });
        res.send({msg: "Category saved successfully!"});

    } catch (error) {
        console.error(error);
        res.status(500).send({ code: 500, msg: "Internal Server Error", error: error.message });
    }
};
 
export const  getCategory = async(req,res)=>{
  try {
    const categories = await categorySchemaModel.find({ parentId: "000000000000000000000000" });
    const subcategories = await categorySchemaModel.find({ parentId: { $ne: "000000000000000000000000" } });
    
    return res.status(200).json({
      categories,
      subcategories,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ sms: "Data not fetched" });
  }
}



export const updateCategory = async(req,res)=>{

  const __filename = fileURLToPath(import.meta.url); // Get current file path
const __dirname = path.dirname(__filename); // Get directory name
console.log("__dirname:", __dirname);

  var category = await categorySchemaModel.findById({"_id":req.body.id})
  // console.log(category);
  var caticonname = category.caticon;
  //  console.log(caticonname);
  if(req.files && req.files.caticon){
    var newpathicon = await utility.fileUploadData(req.files.caticon,"categoryicon")
  }else{
    var newpathicon = ""
  }
  const parent_id = req.body.categoryId;
try{
  var update = await categorySchemaModel.findByIdAndUpdate({"_id":req.body.id},{

    catname:req.body.catname,
    subcatname:req.body.subcatname,
    caticon:req.files && req.files.caticon ? newpathicon : caticonname ,
    status:req.body.status,
    parentId :parent_id
  },
  {new:true}
  );

  if(update){
    var imgpath = path.join(__dirname, "../public/categoryicon/",category.caticon); 
    // console.log(imgpath)
    
    if(req.files && req.files.caticon){
      

     if(!(imgpath == "")){
       fs.unlinkSync(imgpath)
     }
    }
    }
  res.status(200).json({"sms":"category update succefully"})
     


}catch(error){
  console.log(error)
  res.status(500).json({"sms":"category not update succefully"})
}
}

export const deleteCategory = async(req,res)=>{
    try{
            const {_id} = req.body;
            if(!_id){
                  return res.status(500).json({"sms":"Category  Id is reuired"})
            }

             // Find the user by ID
             const userData = categorySchemaModel.findById(_id);
             if(!userData){
                return res.status({"sms":"Category not found for the given ID."})
             }
               // cat
             await categorySchemaModel.findByIdAndDelete(_id);

             

             return res.status(200).json({"sms":"category deleted successfully"})

    }catch(error){
        console.log("error"+error)
        return res.status(500).json({"sms":"category  not deleted successfully"})
    }
}