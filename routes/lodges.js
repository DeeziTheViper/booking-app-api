import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import {updateLodge,createLodge,deleteLodge, getLodges } from "../controllers/lodgeController.js";
import { getLodge } from "../controllers/lodgeController.js";




const router = express.Router()


//get all
router.get('/', getLodges)
//get
router.get('/:id', getLodge)
//create
router.post("/",verifyAdmin, createLodge)
//update
router.put('/:id',verifyAdmin, updateLodge)
//Delete
router.delete('/:id',verifyAdmin, deleteLodge)


//another way of handling async calls
/*
router.post("/", async (req, res) => {
    const newLodge = new Lodge(req.body)

    try{
        const savedLodge = await newLodge.save() 
        res.status(200).json(savedLodge)
    }catch(err){
        res.status(500).json(err)
    }
})*/

export default router