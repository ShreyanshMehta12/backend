const OrderModel = require("../models/Order");

class OrderController {
    static createorder = async (req,res) => {
        try {
            const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} =req.body
            const order = await OrderModel.create({
                shippingInfo,
                orderItems,
                paymentInfo,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                paidAt:Date.now(),
                user:req.user._id

            })
res
            .status(201)
            .json({ status: "success", message: "Order added Successfully 😃🍻",order});
        }catch(error){
            console.log(error)
        }
    }
    static getsingleorder = async(req,res) => {
        try{
            const order = await OrderModel.findById(req.params.id)
            res.status(200)
            .json({ status: 'success', order });

        }catch(error){
            console.log(error)
        }
    }
    // in myorder user can watch its order
    static myorder = async(req,res) => {
        try{
            const order = await OrderModel.find()
            res.status(200)
            .json({ status: 'success', order });
            
        }catch(error){
            console.log(error);
        }
    }
    
    // For Admin
    static getallorders = async(req,res) => {
        try{
            const order = await OrderModel.find()
            res.status(200)
            .json({ status: 'success', order });
            
        }catch(error){
            console.log(error)
        }
    }

    static deleteorder = async(req,res) => {
        try{
            const order = await OrderModel.findByIdAndDelete(req.params.id)
            res.status(200)
            .json({ status: 'success', order });
            
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = OrderController