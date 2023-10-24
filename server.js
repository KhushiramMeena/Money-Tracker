const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const path=require('path')

// config
dotenv.config();

// DataBase Call
connectDB();

// rest object
const app = express();

// Middlewares
// app.use(morgan('dev'));
app.use(express.json());
app.use(cors()); // Enable CORS for all domains. You can specify specific domains if needed.

// Routes
// User Routes
app.use("/api/v1/users", require("./routes/userRoutes"));
// Transection Routes
app.use("/api/v1/transections", require("./routes/transactionRoute"));

app.use(express.static(path.join(__dirname, './client/build')))

app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

// PORT
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
