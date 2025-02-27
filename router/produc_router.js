import express from "express";
import * as productController from "../controller/product_controller.js"
const router = express.Router();

router.post("/saveproduct",productController.productSave);
router.get("/getproduct",productController.getProduct);
router.post("/updateProduct",productController.updateProduct);
router.delete("/deleteProduct",productController.deleteproduct);
  

export default router;