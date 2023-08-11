const ProductModel = require('../models/Product')

class ProductController{

    static create = async(req,res)=>{
       try{
            const {title,description} = req.body
            const result = new ProductModel({
                title:title,
                description:description
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
            const{title,description} = req.body
            const data =await  ProductModel.findByIdAndUpdate(req.params.id,{
                title:title,
                description:description
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

}
module.exports = ProductController