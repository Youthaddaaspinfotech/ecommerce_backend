import express from "express";
import * as categoryController from "../controller/category.js"

const  router = express.Router();

router.post("/saveCategory",categoryController.saveCategory);
router.get("/getCategory",categoryController.getCategory);
router.post("/updateCategory",categoryController.updateCategory);
router.delete("/deleteCategory",categoryController.deleteCategory);


export default router;