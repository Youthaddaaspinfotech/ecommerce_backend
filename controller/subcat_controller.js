import "../model/connection.js";
import subCategoryModel from "../model/subCategory_model.js";

export const savesubcategory = async (req,res)=>{
    const userDetails = req.files;
         console.log(userDetails)

    // try{
    //     await savesubcategory.save(userDetails);
    //     res.send(200).json({"sms":"data save successfully"})

    // }catch(error){
    //     res.send(200).json({"sms":"data not save successfully"})
    // }
}