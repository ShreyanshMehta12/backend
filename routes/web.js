const {Router} = require('express')
const express =require('express')
const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')
const CheckUserAuth = require('../middleware/auth')
const router = express.Router()

//product controller
router.post('/create',ProductController.create)
router.get('/display',ProductController.display)
router.get('/view/:id',ProductController.view)
router.post('/update/:id',ProductController.update)
router.delete('/delete/:id',ProductController.delete)

//user controller
router.post('/userregister',UserController.userinsert)
router.post('/verifylogin',UserController.verifylogin)
router.get('/logout',UserController.logout)
router.get('/profile',UserController.profile)
router.post('/updatepassword',CheckUserAuth,UserController.changepassword)
router.post('/updateprofile',CheckUserAuth,UserController.updateprofile)

module.exports = router