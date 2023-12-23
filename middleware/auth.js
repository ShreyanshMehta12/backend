const jwt = require('jsonwebtoken');
const UserModel=require('../models/User');

const CheckUserAuth=async(req,res,next)=>{
    console.log(req.cookies)
    const {token} = req.cookies
    console.log(token)

    if(!token){
        req.flash('error','Unauthorized user, Please Login!')
        return res.redirect('/')
    }
    else{
        const verify_token=jwt.verify(token,'kishanmehta12')
        const user=await UserModel.findById(verify_token.ID)
        //console.log(data)
        req.user=user
        console.log(verify_token)
        next()
    }
}
module.exports=CheckUserAuth