const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: true,
    trim : true,
    unique: true
  },
 
  
  price:{
    type:String,
    trim:true
  },
  address:{
    type:String,
    trim:true
  },
  
  quantity:{
    type:String
  },
  status:{
    type:String,
    trim:true
  },
  createdAt:{
    type:String,
    trim:true

  }

  
  
  



  
  
  
  
  
   
  
  
});

const User = mongoose.model('Orders', OrderSchema);

module.exports = User;
