//Third Party Module
const express =require('express');
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
require('dotenv').config()

// const {MONGOURI} = require('./config/Key')
app.use(express.static('public'));
 
app.use(cors());
//Middleware 
app.use(morgan("dev"));
app.use(express.json()); 

app.use(express.urlencoded({extended: true}));



//Router

 var Companies = require("./Routes/Companies");
 var Modules = require("./Routes/Modules");
 var Plans = require("./Routes/Plans");
 var Orders = require("./Routes/Orders");
 var PanelUser = require("./Routes/Panel_User/AddPanel_User");
 var Coupons = require("./Routes/Coupon");
 var Offers = require("./Routes/Notifications/Offer_Notifications");
 var PlanUpgrade = require("./Routes/Notifications/Add_PlanUpgrade");
 var User = require("./Routes/User");
 var Maintenance = require("./Routes/Notifications/Maintenance");
 var Promotional = require("./Routes/Notifications/Promotional");
 var General_Settings = require("./Routes/System Settings/General_Settings");


//******************************************************************************************************************** 

// app.use( (req,res,next) => {

//   const token = req.cookies.access_token;
  
//   if (!token) {
//       return res.sendStatus(403);
//     }
//   else{
//   try{
  
//       const user = jwt.verify(token, process.env.TOKEN_SECRET);
  
//       if(user){
//        req.user = user;
//           next();
//       }
     
//   }
//   catch(err){
//       res.redirect('https://mystifying-roentgen-aae094.netlify.app')
//       res.json({error: err} )
//   }
//   }
//   })


//use routes

app.use('/', Companies)
app.use('/', Modules)
app.use('/', Plans)
app.use('/', Orders)
app.use('/', PanelUser)
app.use('/', Coupons)
app.use('/', Offers)
app.use('/', PlanUpgrade)
app.use('/', User)
app.use('/', Maintenance)
app.use('/', Promotional)
app.use('/', General_Settings)


// Step 1
var PORT =process.env.PORT || 8080;

//Listen Port
app.listen(PORT,() => { console.log("Super Admin started at this port 8080");})

//DB Connection 
 
mongoose.connect(process.env.MONGODB_URI,err => {
  if(!err)
      {
          console.log("MongoDB Connected");
      }
      else{
        { console.log('Error in DB connection : ' + err) }
      }
});
