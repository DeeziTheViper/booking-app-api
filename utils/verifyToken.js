import jwt from "jsonwebtoken";
import { createErr } from "./error.js";

export const verifyToken = (req, res, next) => {
    
    const token = req.cookies.access_token;
  
    if(!token || token === undefined) return next(createErr(401,"You're not authenticated"))

    jwt.verify(token,process.env.SECRET_KEY,(err, user) => {
        if(err) return next(createErr(403, "Token is not valid"));
        req.user = user;
        next()
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res,next, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createErr(403, "You're not authorized"))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res,() => {
        if(req.user === undefined) return next(createErr(401, "You're not Aunthenticated"))
        if(req.user.isAdmin) return next()
        else return next(createErr(403, "You're not an administrator"))
    })
}