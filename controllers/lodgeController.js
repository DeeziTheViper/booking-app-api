import Lodge from "../models/Lodge.js"
export const getLodges = async (req, res, next) => {
    const lodges = await Lodge.find().catch(err => {
        next(err);
    })

    res.status(200).json(lodges)
}

export const getLodge = async (req, res, next) => {
    const lodge = await Lodge.findById(req.params.id).catch(err => {
        next(err)
    })

    res.status(200).json(lodge)

}

export const createLodge =  async (req, res) => {
    const newLodge = new Lodge(req.body)
    const savedLodge = await newLodge.save().
    catch(err => {
        next(err)
    })

    res.status(200).json(savedLodge)
}

export const updateLodge = async (req, res) => {
    const updatedLodge = await Lodge.findByIdAndUpdate(req.params.id, 
        {
        $set: req.body
    },{
        new: true
    }).catch(err => {
        next(err);
    })

    res.status(200).json(updatedLodge)
}

export const deleteLodge = async (req, res) => {
    await Lodge.findOneAndDelete(req.params.id).catch(
       err => {
           next(err)
       }
    )
    res.status(200).json("Successfully Deleted")
}
