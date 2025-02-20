import "../model/category_model.js";
import utility from "../core/utility.js"

export const saveCategory = async (req, res) => {
    try {
        const { catname } = req.body;  // Extract category name

        // Check if a file is uploaded
        if (req.files && req.files.caticon) {
            let catImg = await utility.fileUploadData(req.files.caticon, "categoryicon");
        }

        res.send({ code: 200, msg: "Category saved successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ code: 500, msg: "Internal Server Error", error: error.message });
    }
};
