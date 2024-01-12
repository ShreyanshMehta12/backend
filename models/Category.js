const mongoose = require('mongoose')

// define schema
const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,    
    },
    
    image: [  
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
},{timestamps:true})

// create collection

const CategoryModel = mongoose.model('category',CategorySchema)
module.exports = CategoryModel;