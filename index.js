import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import hotelRouter from './routes/hotels.js';
import cookieParser from "cookie-parser";
import userRouter from './routes/users.js'
import roomRouter from './routes/rooms.js';

dotenv.config()

const app = express()
app.use(cookieParser())

const connect = async () => {
    const connection = await mongoose.connect(process.env.MONGODB).
    catch(error => {
    });
    console.log(`DB connected on this ${connection.connection.host}`)
}
 

mongoose.connection.on('connected', () => {
    console.log("Connected")
  }); 

mongoose.connection.on('disconnected', () => {
    console.log("Disconnected")
  });



app.use(express.json())
app.use('/api/auth', authRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/users', userRouter);
app.use('/api/rooms', roomRouter);

app.use((err,req,res,next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Unable to complete this request"
    return res.status(errorStatus).json({
        success: false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack 
    })
})

app.listen(5000, () => {
    connect()
    console.log("Connected to server")
})