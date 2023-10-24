const mongoose=require('mongoose')

const connectDB=async ()=>{
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log(`Server running Successfully with mongoose ${mongoose.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}
module.exports=connectDB