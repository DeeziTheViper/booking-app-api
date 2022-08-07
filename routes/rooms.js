import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {updateRoom,getRoom,deleteRoom, getRooms, createRoom } from "../controllers/roomController.js";




const router = express.Router()
//get all
router.get('/', getRooms)
//get
router.get('/:id', getRoom)
//update
router.put('/:id',verifyAdmin, updateRoom)
//create
router.post('/:roomId', verifyAdmin,createRoom)
//Delete
router.delete('/:roomId',verifyAdmin, deleteRoom)




export default router