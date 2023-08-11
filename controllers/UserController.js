const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class UserController{

    static userregister=async(req,res)=>{
        // console.log(req.files.image)
        // const imagefile=req.files.image
        // const imageupload=await cloudinary.uploader.upload(imagefile.tempFilePath,{
        //     folder:'profileimage'
        // })
        // console.log(imageupload)
        const {name,email,password,confirm_password}=req.body
        const user=await UserModel.findOne({email:email});
        // console.log(user)
        if(user){
            res.status(401).json({
                message: 'Email already exists',
            })
            
        }
        else{
            if(name && email && password && confirm_password){
                if(password==confirm_password){
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
                        await result.save()
                        res.status(401).json({
                            message: 'Successfully registered',
                            result,
                        })
                            
                    }catch(error){
                        console.log(error)
                    }
                }
                else{
                    res.status(401).json({
                        message: 'Password and confirm password does not match',
                    }) 
                }
            }
            else{
                res.status(401).json({
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
                    //multiple login
                    // if(user.role == 'user'){
                        //generate token
                      const token=jwt.sign({id: user._id},'kishanmehta12')
                      //console.log(token)
                    res.cookie('token',token)
                    res
                        .status(201)
                        .json({
                            status: "success", 
                            message:"login successfully with web token",
                            token:token,
                            user
                        });
                    // }
                    // if(user.role == 'admin'){
                    //     //generate token
                    //   const token=jwt.sign({id: user._id},'kishanmehta12')
                    //   //console.log(token)
                    //   res.cookie('token',token)
                    //   res.redirect('/admin/display')
                    // }
                   }
                   else{
                    res.status(401).json({
                        message: 'Email and Password is not valid',
                    })
                   
                   }
                }
                else{
                    res.status(401).json({
                        message: 'You are not a registered user',
                    })
                    
                }
            }
            else{
                res.status(401).json({
                    message: 'All Field are required',
                })
                
            }
        }catch(error)
        {
            res.send(error)
        }
     }
   
}
module.exports = UserController;