import Hotel from "../models/Hotel.js"



export const getHotel = async (req, res, next) => {
    const hotel = await Hotel.findById(req.params.id).catch(err => {
        next(err)
    })

    res.status(200).json(hotel)

}

export const createHotel =  async (req, res,next) => {
    const newHotel = new Hotel(req.body)
    const savedHotel = await newHotel.save().
    catch(err => {
        next(err)
    })

    res.status(200).json(savedHotel)
}

export const updateHotel = async (req, res) => {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, 
        {
        $set: req.body
    },{
        new: true
    }).catch(err => {
        next(err);
    })

    res.status(200).json(updatedHotel)
}

export const deleteHotel = async (req, res) => {
    await Hotel.findOneAndDelete(req.params.id).catch(
       err => {
           next(err)
       }
    )
    res.status(200).json("Successfully Deleted")
}



export const getHotels = async (req, res, next) => {
    const {max,min,...others} = req.body
    const hotels = await Hotel.find({...others, cheapestPrice:{$gt:min | 1, $lt:max || 7000}} )
    .limit(req.body.limit)
    .catch(err => next(err))
    res.status(200).json(hotels);
}



export const countByCity = async(req,res,next) => {
    
    let cities = req.body.cities
    const list = await Promise.all(cities.map(city => {
        return Hotel.countDocuments({city:city})
    })).catch(err => {
        next(err)
    })
    res.status(200).json(list);
}

export const countByType = async (req,res,next) => {
    const hotelCount =  await Hotel.countDocuments({type:"Hotel"})
    const apartmentCount = await Hotel.countDocuments({type:"apartment"})
    const resortCount = await Hotel.countDocuments({type:"resort"})
    const villaCount = await Hotel.countDocuments({type:"villa"})
    const cabinCount = await Hotel.countDocuments({type:"cabin"})
    .catch(err => next(err))
    res.status(200).json([
        {type: "hotel", count: hotelCount},
        {type: "apartments", count: apartmentCount},
        {type: "resorts", count: resortCount},
        {type: "villas", count:villaCount},
        {type: "cabins", count: cabinCount},

    ]);
   


}