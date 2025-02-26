import express from "express";
import * as userController from "../controller/user_controller.js"
 

const router = express.Router();
router.post("/save",userController.save)
router.post("/login",userController.login)
router.get("/userfetch",userController.userfetch)
router.post("/updateuser",userController.updateuser)
router.delete("/deleteuser",userController.deleteUser)

export default router;