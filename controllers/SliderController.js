const SliderModel = require('../models/Slider')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary =require("cloudinary").v2;

cloudinary.config({
    cloud_name:"dccjxejqv",
    api_key:"919419823113387",
    api_secret: "fXcGpgVPdl635BTq5JIItFP04b4",
    secure: false,
});

class SliderController{
    static insert = async(req,res)=>{
        try{
             const {title,description,image} = req.body
             const result = new SliderModel({
                 title:title,
                 description:description,
                 image:image,
             })
             await result.save();
             res.status(201).json({
                 success: true,
                 result
             })
        }catch(error){
             console.log(error)
        }
        
     }
     static display = async(req,res)=>{
         try{
             const data =await  SliderModel.find();
             res.status(201).json({
                 success: true,
                 data
             })
         }catch(error){
             console.log(error)
        
         }
     }
}

module.exports = SliderController