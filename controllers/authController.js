import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createErr } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const registerController = async (req, res, next) => {

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    let reqUser = req.body.username.toLowerCase()
    let str = reqUser.charAt(0).toUpperCase()
    let str2 = reqUser.slice(1)
    const newUser = new User({
        ...req.body,
        username: str+str2,
        email: req.body.email.toLowerCase(),
        password: hash
    })
    await newUser.save()
    .catch(
        err => next(err)
    ) 
    
    res.status(200).send("User has been created")
}


export const loginController = async (req, res, next) => {
    try {
    let user = null;
    //accept either username or email for login 
    
        let reqUser = req.body.username
        let str = reqUser.charAt(0).toUpperCase()
        let str2 = reqUser.slice(1)
        const nUsername = str + str2
        const nEmail =req.body.username.toLowerCase()
        
        user = await User.findOne({username: nUsername})
        if(!user) user =  await User.findOne({email:nEmail})
        if (!user) return next(createErr(404, "This account does not exist"))
   
        const passwordCorrect =  bcrypt.compareSync(`${req.body.password}`, user.password)
        if(!passwordCorrect) return(next(createErr(400,"Wrong user Credentials")))
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.SECRET_KEY)
        const {password, ...otherDetails } = user._doc
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({...otherDetails})  
    }catch(err) {
         next(err)
    }
}

