const express=require('express')
const {loginControllers,registerController}=require('../controllers/userControl')

const router=express.Router()

//Router POST LOGIn
router.post('/login',loginControllers)
//Register User
router.post('/register',registerController)

module.exports=router;
