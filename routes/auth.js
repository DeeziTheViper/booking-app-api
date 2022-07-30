import express from "express";
import {loginController, registerController} from "../controllers/authController.js";
import User from "../models/User.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello, this is the Auth API")
})
//check authentication
router.get("/checkauthentication", verifyToken, (req,res) => {
    console.log(req.user)
    if(req.user.isAdmin) return res.send("Hello Admin, you are logged in")
    else return res.send("Hello User, you are logged in")

})

router.get('/checkuser/:id', verifyUser, (req,res) => {
    res.send("Hello you're logged in and can delete your account")
})

router.get('/checkAdmin/:id', verifyAdmin, (req, res,) => {
    res.send("You've have full privilege to delete all users")
})

router.post("/register", registerController);
router.post('/login', loginController);



export default router