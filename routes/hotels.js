import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import {updateHotel,createHotel,deleteHotel, getHotels, countByCity } from "../controllers/hotelController.js";
import { getHotel } from "../controllers/hotelController.js";




const router = express.Router()


//get all
router.get('/', getHotels)
//get
router.get('/find/:id', getHotel)
//create
router.post("/",verifyAdmin, createHotel)
//update
router.put('/:id',verifyAdmin, updateHotel)
//Delete
router.delete('/:id',verifyAdmin, deleteHotel)

router.post('/countByCity', countByCity)
router.get('/countByType', getHotels)


//another way of handling async calls
/*
router.post("/", async (req, res) => {
    const newHotel = new Hotel(req.body)

    try{
        const savedHotel = await newHotel.save() 
        res.status(200).json(savedHotel)
    }catch(err){
        res.status(500).json(err)
    }
})*/

export default router