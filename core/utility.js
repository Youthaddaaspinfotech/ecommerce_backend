 
import path from "path";
import Randomstring from "randomstring";
const utility = {};

utility.fileUploadData = async (data, folderName) => {
    if (data) {
        // Ensure data is always treated as an array (single or multiple files)
        const imageData = Array.isArray(data) ? data : [data];

        // Loop through all the files in the imageData array
        for (const file of Object.values(imageData)) {
            const { name } = file;
            const caticonname = data.name  // Get file extension
           // console.log(caticonname)

            let dt = Date.now(); // Unique timestamp
            let rs = Randomstring.generate();
         var NewImg = rs+"-"+dt+"-"+ caticonname; // Generate unique file name

            let filepath = 'public/' + folderName + '/' + NewImg;
           
            var createdPath = 'public/' + folderName + '/' + NewImg;

           // Move the file to the desired location
            await file.mv(path.join(filepath)); // eska kaam hai  img ko source se uthna aur destination me rakhna
        }
         return NewImg;
    }
}

export default utility ;














