const mongoose=require('mongoose')

const transectionSchema= new mongoose.Schema({
 userid:{
  type:String,
  required:true
 },
  amount:{
    type:Number,
    required:[true,'Amount is required'],
  },
  type:{
    type:String,
    required:[true,"Type reqquired"]
  },
  category:{
    type:String,
    required:[true,'Please choose your category'],
  },
  reference:{
    type:String
  },
  description:{
    type:String,
    required:[true,"Description is also requred"]
  },
  date:{
    type:Date,
    required:[true,"Date is requred"]
  }
},{timestamps:true})


const transactionModel=mongoose.model('transections',transectionSchema)
module.exports=transactionModel;