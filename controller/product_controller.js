import utility from "../core/utility.js";
import "../model/connection.js";
import path from "path";
import productModel from "../model/product_model.js";
import { fileURLToPath } from "url"; // ✅ Import this properly


export const productSave = async (req, res) => {
    const { name, description, category, brand, price, producticon } = req.body;
    // console.log(req.files.producticon);
    try {
        if (req.files && req.files.producticon) {
            var productImg = await utility.fileUploadData(req.files.producticon, 'productImg')
        }

        if (!productImg) {
            return res.status(400).json({ "sms": "Producticon is required" });
        }


        const userDetails = { ...req.body, producticon: productImg }
        await productModel.create(userDetails);
        res.status(200).json({ "sms": "product save successfull" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ "sms": "product not save successfull" })
    }


}


export const getProduct = async (req, res) => {
    let condition = []
    const data = req.body;

    if (data.name) {
        condition.push({ "name": { $regex: post.name, $options: "i" } });
    }

    try {
        let products = await productModel.find({ $and: condition });

        res.status(200).json(products)

    } catch (error) {
        res.status(500).json({ "sms": "product not found" })
    }

}


export const updateProduct = async (req, res) => {
    const { _id, name, description, price, status, producticon, brand, catid } = req.body;

    // Get current directory path
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    try {
        if (!_id) {
            return res.status(400).json({ "sms": "Product ID is required" });
        }

        // Find and update product
        const updatedProduct = await productModel.findByIdAndUpdate(
            _id,
            { name, description, price, status, producticon, brand, catid },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ "sms": "Product not found for the given ID." });
        }

        // Handle file update
        if (req.files && req.files.producticon) {
            if (producticon) { // Ensure producticon is defined before using it
                const imgpath = path.join(__dirname, "../public/productImg/", producticon);
                
                // Remove old file if it exists
                if (fs.existsSync(imgpath)) {
                    fs.unlinkSync(imgpath);
                }
            }

            // Upload new product image
            const newProductIcon = await utility.fileUploadData(req.files.producticon, 'productImg');
            updatedProduct.producticon = newProductIcon;
            await updatedProduct.save();
        }

        return res.status(200).json({ "sms": "Product updated successfully." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ "sms": "Product not updated successfully.", "error": error.message });
    }
};

export const deleteproduct = async (req,res)=>{

    const {_id} = req.body;
    if(!_id){
        res.status(500).json({"sms":"User ID (_id) is required."})
    }

    try{
        const product = await productModel.find({_id})
        if (!product) {
            return res.status(500).json
                ({msg: "User not found."
            });
        }
         // Delete user
         await productModel.findByIdAndDelete(_id);
    
         return res.send({
             code: 200,
             msg: "product deleted successfully"
         });
    }catch(error){
        console.log(error)
        return res.status(500).json
        ({msg: "product not deleted ."
    });
    }
    

}