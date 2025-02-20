 
import path from "path";

const utility = {};

utility.fileUploadData = async (data , folderName)=>{
    if (data){
        const imageData = Array.isArray(data) ? data : [data]; 
        var caticon = req.file.caticon;
        const ext = caticon.split('.').pop();
            let dt = Date.now();
            var caticonnm = "image"+dt+ '.'+ext;

    }
}














