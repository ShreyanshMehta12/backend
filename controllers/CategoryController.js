const CategoryModel = require('../models/Category')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary =require("cloudinary").v2;

cloudinary.config({
    cloud_name:"dccjxejqv",
    api_key:"919419823113387",
    api_secret: "fXcGpgVPdl635BTq5JIItFP04b4",
    secure: false,
});

class CategoryController{

    static category = async(req,res)=>{
        try{
            const{name,image,_id,email}=req.body
            const data = new CategoryModel({
                name:name,
                email:email,
                image:image
            })
            await data.save();
            
            res.status(200).json({
                success: true,
                data       
            })
        }catch(error){
            console.log(error)
        }
    }

    static catdisplay = async (req,res)=>{
        const data = await CategoryModel.find();
        res.status(200).json({
            success: true,
            data,
        });
    };
    static catupdate = async(req,res)=>{
        try{
            const{name,image,_id,email} = req.body
            const data =await  CategoryModel.findByIdAndUpdate(req.params.id,{
                    name:name,
                    email:email,
                    image:image
            });
            await data.save();
            res.status(200).json({
                success: true,
                message:'Update Successfully'
            })
        }catch(error){
            console.log(error);
       
        }
    };
    static catdelete = async(req,res)=>{
        try{
            const data = await  CategoryModel.findByIdAndDelete(req.params.id)
            res.status(200).json({
                success: true,
                message:'Delete Successfully'
                
            })
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = CategoryController;