const {Router} = require('express')
const express =require('express')
const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')
const CheckUserAuth = require('../middleware/auth')
const CategoryController = require('../controllers/CategoryController')
const router = express.Router()
const SliderController = require('../controllers/SliderController')
const PaymentController = require('../controllers/PaymentController')
const OrderController = require('../controllers/OrderController')

//product controller
router.post('/create',ProductController.create)
router.get('/product/display',ProductController.display)
router.get('/view/:id',ProductController.view)
router.post('/update/:id',ProductController.update)
router.delete('/prodelete/:id',ProductController.delete)
router.get('/productdetail/:id',ProductController.productdetail)

//user controller
router.post('/userinsert',UserController.userinsert)
router.post('/verifylogin',UserController.verifylogin)
router.get('/logout',UserController.logout)
router.get('/profile',UserController.profile)
router.post('/updatepassword',CheckUserAuth,UserController.changepassword)
router.post('/updateprofile',CheckUserAuth,UserController.updateprofile)
router.get('/me',CheckUserAuth,UserController.get_user_detail)
router.get('/getalluser',UserController.get_all_user)

//category controller
router.post('/category',CategoryController.category)
router.get('/category/display',CategoryController.catdisplay)
router.delete('/catdelete/:id',CategoryController.catdelete)
router.post('/catupdate/:id',CategoryController.catupdate)
router.get('/categorydetail/:id',CategoryController.categorydetail)

//Slider controller
router.post('/insert',SliderController.insert)
router.get('/sdisplay',SliderController.display)

//payment Controller
router.post('/payment/process', CheckUserAuth,PaymentController.processPayment)
router.get('/stripeapiKey',PaymentController.sendStripeApiKey)

//Order Controller
router.post('/order/create', OrderController.createorder)
router.post('/order/getsingleorder/:id', OrderController.getsingleorder)
router.get('/order/myorder', OrderController.myorder)
router.get('/order/getallorders', OrderController.getallorders)
router.get('/order/deleteorder/:id', OrderController.deleteorder)


module.exports = router