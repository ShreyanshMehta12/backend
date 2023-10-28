const mongoose=require('mongoose')

//define schema
const SliderSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        public_id:{
            type:String,
        },
        url:{
            type:String,
        }
    },
    
},{timestamps:true})

//create collection
const SliderModel = mongoose.model('Slider',SliderSchema)

module.exports = SliderModel