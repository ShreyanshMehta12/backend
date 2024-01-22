const mongoose = require('mongoose')

// define schema
const CategorySchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
},
description:{
    type:String
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

// create collection

const CategoryModel = mongoose.model('category',CategorySchema)
module.exports = CategoryModel;