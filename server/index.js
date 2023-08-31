const express = require("express");
const connectDB = require("./database/Database");
const cors = require("cors");
const cloudinary=require("cloudinary");
const multipart=require('connect-multiparty');

//Dotenv config
require("dotenv").config();
const app = express();

//express json
app.use(express.json());
app.use(multipart());

//cors config
const corsOptions ={
  origin:true,
  credentials:true,
  optionSuccessStatus:200
};

cloudinary.config({ 
  cloud_name: 'dzzfcskat', 
  api_key: '324969864437295', 
  api_secret: 'Y9mW0JkSCDGHXF-fSpveQZ3grFI' 
});

app.use(cors(corsOptions));

//create a route
app.get("/", (req, res) => {
  res.send("Welcome to API");
});

//simple route for testing
app.use("/api/user",require("./controllers/userControllers"));

//middleware for product controller
app.use('/api/product',require('./controllers/productController'));

//middleware for order controller
app.use('/api/orders',require('./controllers/orderController'));


//connect to database
connectDB();

//listen to the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
