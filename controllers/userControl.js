const bcrypt=require('bcrypt')
const saltRounds = 10;
const userModal = require("../models/userModal");


const loginControllers = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModal.findOne({ email });
    if (!user) {

      return res.status(404).send("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      res.status(401).send("Invalid password"); 
    }
    res.status(200).json({success:true,user});
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const registerController = async (req, res) => {
  try {
    
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
   console.log(hashedPassword);
   
    
    const user = await userModal.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};


module.exports = { loginControllers, registerController };
