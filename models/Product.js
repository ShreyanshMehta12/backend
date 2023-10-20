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
    image:{
        public_id:{
            type:String,
        },
        url:{
            type:String,
        }
    },
    price:{
        type:String,
        required:true
    },
    stock:{
        type:String,
        required:true
    },

},{timestamps:true})

//create collection
const ProductModel = mongoose.model('Product',ProductSchema)

module.exports = ProductModel