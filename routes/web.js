const {Router} = require('express')
const express =require('express')
const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')
const CheckUserAuth = require('../middleware/auth')
const CategoryController = require('../controllers/CategoryController')
const router = express.Router()

//product controller
router.post('/create',ProductController.create)
router.get('/display',ProductController.display)
router.get('/view/:id',ProductController.view)
router.post('/update/:id',ProductController.update)
router.delete('/delete/:id',ProductController.delete)
router.get('/productdetail/:id',ProductController.productdetail)

//user controller
router.post('/userinsert',UserController.userinsert)
router.post('/verifylogin',UserController.verifylogin)
router.get('/logout',UserController.logout)
router.get('/profile',UserController.profile)
router.post('/updatepassword',CheckUserAuth,UserController.changepassword)
router.post('/updateprofile',CheckUserAuth,UserController.updateprofile)
router.get('/me',UserController.get_user_detail)
router.get('/getalluser',UserController.get_all_user)

//category controller
router.post('/category',CategoryController.category)
router.get('/category/display',CategoryController.catdisplay)
router.get('/categorydelete/:id',CategoryController.catdelete)

module.exports = router