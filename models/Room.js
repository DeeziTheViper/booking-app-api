import mongoose from 'mongoose';
const { Schema } = mongoose;

const roomSchema = new Schema({
  title:{
    type: String,
    trim: true,
    required: true,
},
  desc:{
    type: String,
    trim: true,
    required: true,
},
   price:{
    type:Number,
    trim:true,
    required: true,
},
roomNumbers:[{number:Number, unavailableDates:[{ type: Date}]}],
maxPeople:{
    type:Number,
    trim:true,
    required: true
} 
},{timestamps: true});

export default mongoose.model("room", roomSchema)