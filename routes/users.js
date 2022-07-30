import express from "express";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";
import {updateUser,getUser,deleteUser, getUsers } from "../controllers/userController.js";




const router = express.Router()



//get all
router.get('/',verifyAdmin, getUsers)
//get
router.get('/:id',verifyUser, getUser)
//update
router.put('/:id',verifyUser, updateUser)
//Delete
router.delete('/:id',verifyUser, deleteUser)




export default router