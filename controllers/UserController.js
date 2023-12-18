const UserModel = require('../models/User');
const ProductModel = require('../models/Product')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary =require("cloudinary").v2;

cloudinary.config({
    cloud_name:"dccjxejqv",
    api_key:"919419823113387",
    api_secret: "fXcGpgVPdl635BTq5JIItFP04b4",
    secure: false,
});

class UserController{

    static userinsert=async(req,res)=>{
        // console.log(req.files.image)
        const imagefile=req.files.image
        const imageupload=await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder:'profileimage'
        })
        // console.log(imageupload)
        const {name,email,password,cpassword}=req.body
        const user=await UserModel.findOne({email:email});
        console.log(user)
        if(user){
            res.status(201).json({
                message: 'Email already exists',
            })
            
        }
        else{
            if(name && email && password && cpassword){
                if(password==cpassword){
                    try{
                        const hashpassword=await bcrypt.hash(password,10)
                        const result=new UserModel({
                        name: name,
                        email: email,
                        password: hashpassword,
                        image:{
                            public_id: imageupload.public_id,
                            url: imageupload.secure_url
                        }
                        })
                        // console.log(result)
                        await result.save()
                        res.status(201).json({
                            message: 'Successfully registered',
                            result,
                        })
                            
                    }catch(error){
                        console.log(error)
                    }
                }
                else{
                    res.status(201).json({
                        message: 'Password and confirm password does not match',
                    }) 
                }
            }
            else{
                res.status(201).json({
                message: 'All fields are required',
            })
            
            }
        }
    }
    static verifylogin=async(req,res)=>{
        try{
            // console.log(req.body)
            const{email,password}=req.body
            if(email && password){
                const user=await UserModel.findOne({email:email})
                if(user != null){
                   const ismatched = await bcrypt.compare(password,user.password)
                   if(ismatched){
                    
                    //generate token
                    const token = jwt.sign({ID: user._id},'kishanmehta12')
                    console.log(token)
                    
                    res.cookie('token',token)
                    // console.log(res.cookie)
                    res.status(201)
                        .json({status: "success",message:"login successfully with web token",token,user});
                    
                   }
                   else{
                    res.status(201).json({
                        message: 'Email and Password is not valid',
                    })
                   
                   }
                }
                else{
                    res.status(201).json({
                        message: 'You are not a registered user',
                    })
                    
                }
            }
            else{
                res.status(201).json({
                    message: 'All Field are required',
                })
                
            }
        }catch(error)
        {
            res.send(error)
        }
    }
    static logout =async(req,res)=>{
        try{
            res.clearCookie('token')
            res.status(200).json({
                success:true,
                message:"Logged Out",
            });
        }catch(error){
            console.log(error)
        }
    }
    static profile =async(req,res)=>{
        try{
            const{name,image,_id,email}=req.user
            res.render('profile',{n:name,i:image,e:email,message: req.flash('success')})

        }catch(error){
            console.log(error)
        }
    }
    static changepassword =async(req,res)=>{
        try{
            const{name,image,_id,email}=req.user
            const{oldpassword,newpassword,cpassword}=req.body

            if(oldpassword && newpassword && cpassword){
                const user=await UserModel.findById(_id)
                const ismatch=await bcrypt.compare(oldpassword,user.password)
                if(!ismatch){

                    res.status(201)
                    .json({ status: "Failed",message: "Old Password is incorrect"});
        
                }else{
                    if(newpassword!==cpassword){

                        res.status(201)
                        .json({ status: "Failed",message: "Password and Conform Password does not match"});
            
                    }else{
                        const newHashPassword=await bcrypt.hash(newpassword,10)
                        await UserModel.findByIdAndUpdate(_id,{
                            $set:{password:newHashPassword},
                        });

                        res.status(201)
                        .json({ status: "Success",message: "Password changed successfully"});
            
                    }
                }
            }else{
                res.status(201)
                .json({ status: "Failed",message: "All Field are required"});
            
            }

            // console.log(req.body)
        }catch(error){
            console.log(error)
        }
    }
    static updateprofile = async (req, res) => {
        try {
            //console.log(req.files.image)
            if (req.files) {
                const user = await UserModel.findById(req.user.id);
                const image_id = user.image.public_id;
                await cloudinary.uploader.destroy(image_id);
    
                const file = req.files.image;
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "studentimage",
    
                });
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    image: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url,
                    },
                };
            } else {
                var data = {
                    name: req.body.name,
                    email: req.body.email,
    
                }
            }
            const update_profile = await UserModel.findByIdAndUpdate(req.user.id, data)
            res.status(201)
            .json({status: "Success", message: "Profile Update successfully"});
        } catch (error) {
            console.log(error)
        }
    }
    static get_user_detail =async(req,res)=>{
        try{
            const user=await UserModel.findById(req.user.id)
            res.status(201).json({
                success:true,
                user
            });
        }catch(error){
            console.log(error)
        }
        
    }
    static get_all_user =async(req,res)=>{
        
        try{
            const user=await UserModel.find()
            //console.log(result)
            res.status(201).json({
                success:true,
                user
            })  
        }
        catch(error){
            console.log(error)
        }
    }
}
module.exports = UserController;    