const {Router} = require('express')
const express =require('express')
const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')
const router = express.Router()

//product controller
router.post('/create',ProductController.create)
router.get('/display',ProductController.display)
router.get('/view/:id',ProductController.view)
router.post('/update/:id',ProductController.update)
router.delete('/delete/:id',ProductController.delete)

//user controller
router.post('/userregister',UserController.userregister)
router.post('/verifylogin',UserController.verifylogin)



module.exports = router