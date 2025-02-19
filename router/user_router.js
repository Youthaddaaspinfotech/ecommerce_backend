import express from "express";
import * as userController from "../controller/user_controller.js"
const router = express.Router();
router.post("/save",userController.save)
router.post("/login",userController.login)
router.post("/userfetch",userController.userfetch)
export default router;