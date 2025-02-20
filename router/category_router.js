import express from "express";
import * as categoryController from "../controller/category.js"

const  router = express.Router();

router.post("/saveCategory",categoryController.saveCategory);

export default router;