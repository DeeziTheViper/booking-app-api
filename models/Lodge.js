import mongoose from 'mongoose';
const { Schema } = mongoose;

const LodgeSchema = new Schema({
  name:{
    type: String,
    trim: true,
    required: true
},
type:{
    type:String,
    trim:true,
    required: true
},

title:{
    type:String,
    trim:true,
    required: true
},
city:{
        type:String,
        trim: true,
        required: true
    },
address: {
    type:String,
    trim: true,
    required: true
},

distance: {
    type: String,
    trim: true,
    required: true
},

desc: {
    type: String,
    trim : true,
    required: true
},
photos:{
    type:[String],
},

rating:{
    type: Number,
    min:0,
    max:5,
},
rooms:{
    type:[String],
},
cheapestPrice:{
    type: Number,
    required: true
},
featured: {
    type:Boolean,
    default:false
},


});

export default mongoose.model("Lodge",LodgeSchema)