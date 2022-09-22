
import User from "../models/User.js";

export const getUsers = async (req, res, next) => {
    const user = await User.find().catch(err => {
        res.status(500).json(err);
    })

    res.status(200).json(user)
}

export const getUser = async (req, res, next) => {
    const user = await User.find({"username":req.params.username}).catch(err => {
        next(err)
    })

    res.status(200).json(user)

}

export const updateUser = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, 
        {
        $set: req.body
    },{
        new: true
    }).catch(err => {
        res.status(500).json(err);
    })

    res.status(200).json(updatedUser)
}

export const deleteUser = async (req, res) => {
    await User.findOneAndDelete(req.params.id).catch(
       err => {
           res.status(500).json(err)
       }
    )
    res.status(200).json("Successfully Deleted")
}
