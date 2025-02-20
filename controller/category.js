import "../model/category_model.js";

export const saveCategory = async(req,res)=>{
    const {caticon}   = req.body;    

    if(req.files && req.file.image){
        let catImg = await utility.fileUploadData(req.file.image,"categoryicon")
    }
   
    
}











