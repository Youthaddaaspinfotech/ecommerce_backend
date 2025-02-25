import  categorySchemaModel from "../model/category_model.js";
import utility from "../core/utility.js"

export const saveCategory = async (req, res) => {
            
    // console.log(req.files)// file ke data ko recive karne ke liye use hota hai 
    try {
        const { caticon} = req.files;  // Extract category name
        // console.log(caticon);    
        // Check if a file is uploaded
        let CategorySchemaModel ;
        let catImg;
        if (req.files && req.files.caticon) {
             catImg = await utility.fileUploadData(req.files.caticon, "categoryicon");
        }
       

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
          let post = req.query;
          let condition = [];
          if(post.catname){
            condition.push({"catname": { $regex: post.catname, $options: "i" } });
          }
           
          let data = await categorySchemaModel.find({$and:condition});
           

          return res.status(200).json({"data":data})        

     }catch{
        return res.status(500).json({"sms":"data  not fetch"}) 
     }
}


export const updateCategory = async (req,res)=>{
      try{
        const {_id,caticon , catname} = req.body;
       
        let rowdata = await categorySchemaModel.findById(_id);
        if(!rowdata){
            return res.status(404).json({ "sms": "Category not found" });
        }
        // Only update the fields that are passed in the request
       if(catname) rowdata.catname  = catname;
       if(caticon) rowdata.caticon  = caticon;
  // Save the updated  document
  await rowdata.save();

  return res.status(200).json({"msg":"Category updated successfully"})
      }catch(error){
       
            console.error("Error updating category:", error);
            res.status(500).json({ "sms": "Category not updated", "error": error.message });
        
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

             return res.status(200).json({"sms":"category deleted success fully"})

    }catch(error){
        console.log("error"+error)
        return res.status(500).json({"sms":"category  not deleted success fully"})
    }
}