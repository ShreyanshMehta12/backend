const mongoose=require('mongoose')

//define schema
const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:[
    {
        public_id:{
            type:String,
            required: true,
        },
        url:{
            type:String,
            required: true,
        },
    },
    ],
    price:{
        type: Number,
        required:true
    },
    stock:{
        type: Number,
        required:true,
        default: 1,
    },

},{timestamps:true})

//create collection
const ProductModel = mongoose.model('Product',ProductSchema)

module.exports = ProductModel