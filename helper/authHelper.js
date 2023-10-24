 const bcrypt=require('bcrypt')
const saltRounds = 10;

const hashPassword=async(password)=>{
try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
   console.log(hashPassword);
    return hashedPassword;
    
} catch (error) {
    console.log(`Hashpassword Error =${error}`);
}
}

module.exports=hashPassword;

