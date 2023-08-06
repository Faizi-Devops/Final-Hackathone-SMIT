const mongoose = require('mongoose');

const userregisterSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim : true
  },
  email: {
    type: String,
    required: true,
    trim : true,
    unique: true
  },
  password: {
    type: String,
    trim : true,
    required: true
  },
  contactNumber: {
    type: String,
    trim: true,
    required: true
  },
  address: {
    type: String,
    trim: true,
    required: true
  },
  state: {
    type: String,
    trim: true,
    required: true
  },
  country: {
    type: String,
    trim: true,
    required: true
  },
  pincode: {
    type: String,
    trim: true,
    required: true
  },
  regdate: {
    type: String,
    trim: true,
    required: true
  },newPassword:{
    type: String,
    trim: true,
   

  },
  uniqueId:{
    type:String,
    trim:true,
    
  },
  image:{
    type:String
  },
  token:{
    type:String,
    default:""
  },
  updatedAt:{
    type:String,
    trim:true
  }
  // contactNumber: {
  //   type: String,
  //   trim: true,
  //   required: true
  // }
  
  // address,state,country,pincode,regdate,photourl
});

const User = mongoose.model('UserRegister', userregisterSchema);

module.exports = User;
