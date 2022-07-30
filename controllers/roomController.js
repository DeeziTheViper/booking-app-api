import Room from "../models/Room.js";
import Lodge from "../models/Lodge.js";

export const createRoom = async (req, res, next) => {
    const lodge = req.params.lodgeId
    const newRoom = await new Room(req.body).save()
    .catch(err => next(err))
     await Lodge.findByIdAndUpdate(lodge,{
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
    console.log(req.body.roomId)
    await Room.findByIdAndDelete(req.body.roomId)
    .catch(err => next(err))
    await Lodge.findByIdAndUpdate(req.params.lodgeId, {
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