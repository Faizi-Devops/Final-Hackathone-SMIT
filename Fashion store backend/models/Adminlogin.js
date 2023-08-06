const mongoose = require('mongoose');

const adminloginSchema = new mongoose.Schema({
  
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
  newPassword:{
    type: String,
    trim: true,
   

  },
  
  
  
  
  
   
  
  
});

const User = mongoose.model('AdminLogin', adminloginSchema);

module.exports = User;
