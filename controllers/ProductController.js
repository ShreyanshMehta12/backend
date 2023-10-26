const ProductModel = require('../models/Product');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary =require("cloudinary").v2;

cloudinary.config({
    cloud_name:"dccjxejqv",
    api_key:"919419823113387",
    api_secret: "fXcGpgVPdl635BTq5JIItFP04b4",
    secure: false,
});

class ProductController{
    
    static create = async(req,res)=>{
       try{
            const {name,description,image,price,stock} = req.body
            const result = new ProductModel({
                name:name,
                description:description,
                image:image,
                price:price,
                stock:stock
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
            const data =await  ProductModel.find();
            res.status(201).json({
                success: true,
                data
            })
        }catch(error){
            console.log(error)
       
        }
    }
    static view = async(req,res)=>{
        try{
            const data =await  ProductModel.findById(req.params.id);
            res.status(201).json({
                success: true,
                data
            })
        }catch(error){
            console.log(error)
       
        }
    }
    static update = async(req,res)=>{
        try{
            const{name,description,image,price,stock} = req.body
            const data =await  ProductModel.findByIdAndUpdate(req.params.id,{
                name:name,
                description:description,
                image:image,
                price:price,
                stock:stock
            });
            res.status(201).json({
                success: true,
                message:'Update Successfully'
            })
        }catch(error){
            console.log(error);
       
        }
    }
    static delete = async(req,res)=>{
        try{
            const data =await  ProductModel.findByIdAndDelete(req.params.id)
            res.status(201).json({
                success: true,
                message:'Delete Successfully'
                
            })
        }catch(error){
            console.log(error);
       
        }
    }
    static productdetail = async(req,res) =>{
        const productdetails = await ProductModel.findById(req.params.id);
        res.status(200).json({
            success: true,
            pass,
        });
    }

}
module.exports = ProductController