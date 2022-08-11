import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
    const hotel = req.params.hotelId
    const newRoom = await new Room(req.body).save()
    .catch(err => next(err))
     await Hotel.findByIdAndUpdate(hotel,{
        $push:{rooms:newRoom._id}
     })
    .catch(err => {
        next(err)
    })
    
    res.status(200).json(newRoom)
    
}

export const updateRoom = async (req, res, next) => {
    const room = await Room.findByIdAndUpdate(req.params.id, {
        $set: req.body
        
    },{new:true}).catch(err => next(err))
    res.status(200).json(room)
}


export const deleteRoom = async (req, res, next) => {
    
    await Room.findByIdAndDelete(req.body.roomId)
    .catch(err => next(err))
    await Hotel.findByIdAndUpdate(req.params.HotelId, {
        $pull: {
            rooms:req.params.id
        },
    }).catch(err => next(err))
    res.status(200).json("Room Successfully Deleted")
}

export const getRoom = async (req, res, next) => {
    const room = await Room.findOne({id:req.params.id})
    .catch(err => next(err) )

    res.status(200).json(room)
}
export const getRooms = async (req, res, next) => {
    const rooms = await Room.find().catch(err => next(err))
    res.status(200).json(rooms)
}

export const updateRoomAvailablity =  (req, res, next) => {
     Room.updateOne(
        {
            "roomNumbers._id" : req.body.id
        }, {
        $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
        }
    }).catch(err => next(err))
    res.status(200).json("Room status has been updated")
   
}