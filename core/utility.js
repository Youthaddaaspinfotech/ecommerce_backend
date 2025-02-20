 
import path from "path";

const utility = {};

utility.fileUploadData = async (data, folderName) => {
    if (data) {
        // Ensure data is always treated as an array (single or multiple files)
        const imageData = Array.isArray(data) ? data : [data];

        // Loop through all the files in the imageData array
        for (const file of Object.values(imageData)) {
            const { name } = file;
            const ext = name.split('.').pop(); // Get file extension
            let dt = Date.now(); // Unique timestamp
            let NewImg = "image" + dt + '.' + ext; // Generate unique file name
            let filepath = 'public/' + folderName + '/' + NewImg;
            var createdPath = 'public/' + folderName + '/' + NewImg;

            // Move the file to the desired location
            await file.mv(path.join(filepath));
        }
        return createdPath;
    }
}

export default utility ;














