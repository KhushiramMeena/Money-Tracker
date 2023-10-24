const express=require('express')
const {getAlltransc,addtransec,edittransection,deletetransection}=require('../controllers/transactionController')

const router=express.Router()

//Add transec post
router.post('/add-data', addtransec)

//Get transec all data
router.post('/getall',getAlltransc)


//Get  Edit Traansection
router.post('/edit',edittransection)

//Get  delete Traansection
router.post('/delete',deletetransection)


module.exports=router;
