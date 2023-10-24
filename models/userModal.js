const mongoose=require('mongoose')

//Schema design
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"E-mail is required"],
        unique:[true,"E-mail should be unique"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
},{timestamps:true})

const userModal=mongoose.model('users',userSchema);
module.exports=userModal;